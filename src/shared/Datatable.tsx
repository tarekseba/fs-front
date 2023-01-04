import React, { ChangeEvent } from "react"
import { Button, LinearProgress, MenuItem, Pagination, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField, Theme, Tooltip } from "@mui/material"
import { ClassNameMap, makeStyles } from "@mui/styles"
import { ApiPaginatedSearchResult, OrderType, SearchCriteria } from "../utils/types"
import { Column } from "./utils/types"
import * as _ from "lodash"

const per_page_options: number[] = [5, 10, 20, 30, 40, 50]

const useStyles: () => ClassNameMap<any> = makeStyles((theme: Theme) => ({
	root : {
		position             : "relative",
		maxWidth             : "100%",
		"& .TableHead tr th" : {
			height       : 44,
			padding      : 0,
			overflow     : "hidden",
			textOverflow : "ellipsis",
			whiteSpace   : "nowrap",
			background   : "white",
		}
	},
	progress : {
		position : "absolute",
		left     : 0,
		right    : 0
	},
	fixedActionColumn : {
		"& tbody tr td:last-child" : {
			position  : "sticky",
			right     : 0,
			zIndex    : 999,
			textAlign : "right"
		}
	},
	row: {
		"&:hover": {
			backgroundColor: "rgb(239 239 239 / 74%)",
			transition: "all ease-in-out 250ms",
		},
    "& td": {
      verticalAlign: "top"
    }
	},
  topHeaderAction: {
    marginTop: ".5rem",
    marginLeft: "1rem",
    minHeight: "3rem"
  },
  topHeaderSearch: {
    marginLeft: "auto",
    marginRight: "1rem",
    "& > .MuiInputBase-root": {
      height: "2.5rem"
    }
  },
  actionHeader: {
    minHeight: "5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  tableFooter: {
    paddingTop: ".4rem",
    paddingBottom: ".4rem",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "1rem",
    paddingRight: "2rem"
  }
}))

type Order = "asc" | "desc"

interface DatatableProps<T> {
  loading?: boolean
  data?: ApiPaginatedSearchResult<T>
  columns: Array<Column<T>>
  cellActions: (row: T) => JSX.Element
  headerAction?: () => void
  searchCriteria: SearchCriteria
  updateCriteria: (criteria: SearchCriteria) => any
  debouncedUpdateCriteria?: (criteria: SearchCriteria) => any
}
export const Datatable = <T extends object>({ columns, data, loading = false, cellActions, headerAction, searchCriteria, updateCriteria, debouncedUpdateCriteria }: DatatableProps<T>): JSX.Element => {
	const classes = useStyles()


  const toggleOrder = (order: OrderType): OrderType => {
    switch(order) {
      case "ASC": return "DESC"
      case "DESC": return "ASC"
    }
  }
  const handleSort = (field_name: string) => () => {
    return updateCriteria({...searchCriteria, by: field_name, order: toggleOrder(searchCriteria?.order as OrderType)}) 
  } 

  const onGlobalSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    debouncedUpdateCriteria && debouncedUpdateCriteria({ ...searchCriteria, name: event.currentTarget.value, description: event.currentTarget.value })
  }

  const onPaginationChange = (_event: ChangeEvent<unknown>, page: number) => {
    updateCriteria({ ...searchCriteria, page }) 
  }

  const onPerPageChange  = (event: SelectChangeEvent<number>) => {
    updateCriteria({ ...searchCriteria, per_page: event.target.value as number }) 
  }

  if(data?.result)
    console.log(new Date((data.result[0] as any).created_at).toLocaleString().replace(",", " "))

	return <div className={classes.root}>
		{loading && <LinearProgress className={classes.progress} />}
		<TableContainer component={Paper}>
      <div className={classes.actionHeader}>
        <div className={classes.topHeaderAction}>{headerAction && <Button variant="contained" onClick={headerAction}>ADD</Button>}</div>
        <TextField className={classes.topHeaderSearch} placeholder={"Global search"} onChange={onGlobalSearchChange}/>
      </div>
			<Table
				sx={{ minWidth: 750 }}
				aria-labelledby="tableTitle"
				size={"small"}
        style={{borderTop: "1px solid black" }}
			>
				<TableHead className={"TableHead"}>
					<TableRow >
						{ columns?.map((col: Column<T>, index: number) => (
							<TableCell align="center" key={`${col.label}_${index}`} style={{fontWeight: "bold"}}>
                {col.can_sort ? (
                  <Tooltip title={"Trier"} >
                    <TableSortLabel active={col.field_name === searchCriteria?.by?.toLowerCase()} direction={searchCriteria?.order?.toLowerCase() as Order} onClick={handleSort(col.field_name as string)}>
                      {col.label}
                    </TableSortLabel>
                  </Tooltip>
                ): (<span>{col.label}</span>)}
              </TableCell> 
						))}
            <TableCell align="center" style={{fontWeight: "bold", width: "2rem"}} /> 
					</TableRow>
				</TableHead>
				<TableBody>
					{ data?.result?.map((row: T) => (
						<TableRow key={"${row.name}_${row_id}"} className={classes.row}>
							{columns.map((col: Column<T>, index: number) => (
								<TableCell key={index} align="center">
									{col.formatter ? col.formatter(row) : _.get(row, col.field_name)}
								</TableCell>
							))}
              {true &&
                <TableCell align="center">{cellActions(row)}</TableCell>
              }
						</TableRow>
					))}
				</TableBody>
			</Table>
      <div className={classes.tableFooter}>
        <Pagination variant="text" shape="rounded" page={searchCriteria?.page || 1} count={data?.total_pages || 0} onChange={onPaginationChange} />
        <Select defaultValue={searchCriteria?.per_page || 10} style={{height: "2rem"}} onChange={onPerPageChange}>
          {per_page_options.map((value: number) => <MenuItem key={value} value={value}>{value}</MenuItem>)}
        </Select>
      </div>
		</TableContainer>
	</div>
}

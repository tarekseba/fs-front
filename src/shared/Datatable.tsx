import React from "react"
import { Box, Button, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Theme, Tooltip } from "@mui/material"
import { ClassNameMap, makeStyles } from "@mui/styles"
import { ApiPaginatedSearchResult, OrderType, SearchCriteria } from "../utils/types"
import { Column } from "./utils/types"
import * as _ from "lodash"

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
  topHeader: {
    marginTop: ".5rem",
    marginLeft: "1rem",
    minHeight: "3rem"
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
}
export const Datatable = <T extends object>({ columns, data, loading = false, cellActions, headerAction, searchCriteria, updateCriteria }: DatatableProps<T>): JSX.Element => {
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

	return <div className={classes.root}>
		{loading && <LinearProgress className={classes.progress} />}
		<TableContainer component={Paper}>
      <div className={classes.topHeader}>{headerAction && <Button variant="contained" onClick={headerAction}>ADD</Button>}</div>
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
		</TableContainer>
	</div>
}

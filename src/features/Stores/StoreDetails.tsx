import { Autocomplete, AutocompleteRenderInputParams, Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Paper, TextField, Theme, Typography } from "@mui/material"
import { ClassNameMap, makeStyles } from "@mui/styles"
import React, { SyntheticEvent, useEffect, useState } from "react"
import { Params, useParams } from "react-router-dom"
import { useAppActions, useAppSelector } from "../../appRedux/hooks"
import { ProductState, StoreState } from "../../appRedux/slices"
import { Worktime } from "../../appRedux/slices/storeSlice"
import { RootState } from "../../appRedux/store"
import { MainActions } from "../../appRedux/types"
import { defaultSearchCriteria, ReactState, DaysOfWeek, SearchCriteria, AutocompleteData } from "../../utils/types"
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded"
import CakeRoundedIcon from "@mui/icons-material/CakeRounded"
import moment from "moment"
import { Datatable } from "../../shared/Datatable"
import { dateFormatter, priceFormatter } from "../Products/Products"
import { Column } from "../../shared/utils/types"
import { Product, ProductSearchCriteria } from "../../appRedux/slices/productSlice"
import { renderProductsCellActions } from "../Products/table/renderProductsCellActions"
import * as _ from "lodash"
import { Category, CategoryState } from "../../appRedux/slices/categoriesSlice"

const useStyles: () => ClassNameMap<any> = makeStyles((theme: Theme) => ({
  mainContainer: {
    margin: "auto",
    padding: "1rem",
    [theme.breakpoints.up("lg")]: {
      width: "80%"
    },
    [theme.breakpoints.down("lg")]: {
      width: "90%"
    }
  },
  dataContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    justifyContent: "center",
    [theme.breakpoints.down("lg")]: {
      flexWrap: "wrap"
    },
  },
  statsContainer: {
    display: "flex", 
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("lg")]: {
      flexDirection: "row",
      alignItems: "flex-start",
    },
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    gap: "1rem",
    marginBottom: "1rem"
  },
  tableContainer: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("lg")]: {
      marginLeft: "auto",
      marginRight: "auto"
    },
  },
  detailItem: {
    "& .MuiListItemText-primary": {
      color: theme.palette.primary.light
    },
    "& .MuiListItemText-secondary": {
      letterSpacing: "2px"
    },
  },
  filtersPaper: {
    display: "flex",
    flexDirection: "row",
    gap: ".5rem",
    padding: "1rem 0rem 0rem",
    justifyContent: "flex-end",
  }
}))

export const renderInput = (params: AutocompleteRenderInputParams) => <TextField variant="standard" style={{maxWidth: "auto", minWidth: "15rem"}} {...params} label={"Category"}/>

export const StoreDetails = () => {
  const actions: MainActions = useAppActions()
  const { store, count }: StoreState = useAppSelector((state: RootState) => state.store)
  const { products, searchCriteria }: ProductState = useAppSelector((state: RootState) => state.product)
  const { categories }: CategoryState = useAppSelector((state: RootState) => state.category)
  const [ loading, setIsLoading ]: ReactState<boolean> = useState<boolean>(false)
  const i18nNameState: ReactState<boolean> = useState<boolean>(false)
  const i18nDescriptionState: ReactState<boolean> = useState<boolean>(false)

  const { id }: Params = useParams()

  const styles: ClassNameMap<any> = useStyles()
  const storeId: number = parseInt(id || "NaN")

  const columns: Column<Product>[] = [
    { label: "Nom", field_name: "name", can_sort: true, i18n: i18nNameState },
    { label: "Price", field_name: "price", can_sort: true, formatter: priceFormatter },
    { label: "Description", field_name: "description", can_sort: true, i18n: i18nDescriptionState },
    { label: "Creation date", field_name: "created_at", can_sort: true, formatter: dateFormatter }
  ]

  const selectHandler = (_event: SyntheticEvent, value: any) => {
    actions.product.edit.criteria({...searchCriteria, category_id: value?.value})
  }

  const handleChange = (_e: SyntheticEvent, value: string) => {
    actions.category.get.categories({...searchCriteria, name: value})
  }

  const options: AutocompleteData<number>[] = categories && categories.result ? categories.result.map((category: Category) => ({ value: category.id, label: category.name } as AutocompleteData<number>)) : []

  useEffect(() => {
    setIsLoading(true)
    Promise.all([
      actions.store.get.store(storeId),
      actions.product.edit.criteria({...defaultSearchCriteria, store_id: storeId}),
      actions.store.get.count(storeId)
    ]).then(() => setIsLoading(false))
  }, [])

  return (<Box className={styles.mainContainer}>
    <div className={styles.dataContainer}>
      <div className={styles.statsContainer}>
        <Box component={Paper} sx={{border: (theme: Theme) => `2px solid ${theme.palette.primary.light}`, borderRadius: "15px"}}>
          <div style={{padding: ".5rem 1rem 0"}}>
            <Typography variant="h5" color="primary.main" textTransform="capitalize" letterSpacing={2} sx={{textShadow: (theme: Theme) => `1px 3px 80px ${theme.palette.primary.dark}`}}>{store?.name}</Typography>
          </div>
          <div>
            <List style={{display: "flex", flexDirection: "row", justifyContent: "space-around", padding: "0"}}>
            <DetailItem label={"Products"} data={count ? count : 0} Icon={InventoryRoundedIcon}/>
            <DetailItem label={"Created"} data={moment(store?.created_at).format("MMM Do, YYYY")} Icon={CakeRoundedIcon}/>
          </List>
          </div>
        </Box>
        <Box component={Paper} padding="1rem" sx={{border: (theme: Theme) => `2px solid ${theme.palette.primary.light}`, borderRadius: "15px"}}>
          <table style={{margin: "auto"}}>
            {store?.worktimes && 
              store.worktimes.map((worktime: Worktime, index: number) => (
                <tr key={`${DaysOfWeek[worktime.day_id]}_${index}}`}>
                  <td><Typography color="primary.dark">{DaysOfWeek[worktime.day_id].slice(0, 3)}</Typography></td>
                  <td>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                      <Typography variant="body2" style={{ marginRight: ".5rem", marginLeft: ".5rem"}}>{worktime.am_open ? worktime.am_open : <NdText/>}</Typography>
                      <Typography variant="h5" >-</Typography>
                      <Typography variant="body2" style={{ marginLeft: ".5rem" }}>{worktime.am_close ? worktime.am_close : <NdText/>}</Typography>
                      <Typography variant="body2" color={"secondary.dark"}>&nbsp;am</Typography>
                    </div>
                  </td>
                  <td>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                      <Typography variant="body2" style={{ marginLeft: "1rem", marginRight: ".1rem"}}>{worktime.pm_open ? worktime.pm_open : <NdText/>}</Typography>
                      <Typography variant="h5" >-</Typography>
                      <Typography variant="body2" style={{ marginLeft: ".1rem" }}>{worktime.pm_close ? worktime.pm_close : <NdText/>}</Typography>
                      <Typography variant="body2" color="secondary.dark">&nbsp;pm</Typography>
                    </div>
                  </td>
                </tr>
              ))
            }
          </table>
        </Box>
      </div>
      <div className={styles.tableContainer}>
        <Datatable<Product, ProductSearchCriteria> 
          columns={columns} 
          cellActions={renderProductsCellActions()} 
          searchCriteria={searchCriteria}
          updateCriteria={actions.product.edit.criteria} data={products} 
          debouncedUpdateCriteria={_.debounce(actions.product.edit.criteria, 500)}
        />
        <div>
          <div className={styles.filtersPaper}>
            <Box component={Paper} style={{padding: ".5rem 1rem 1rem", borderRadius: "15px"}}>
              <Autocomplete<AutocompleteData<number>>
                renderInput={renderInput}
                options={options}
                onChange={selectHandler}
                onInputChange={handleChange}
              />
            </Box>
          </div>
        </div>
      </div>
    </div>
  </Box>)
}

const NdText = () => (<Typography variant="subtitle1" color={(theme: Theme) => theme.palette.grey[500]}>nd</Typography>)

const DetailItem = ({label, data, Icon}: DetailItemProp) => {
  const styles: ClassNameMap<any> = useStyles()
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <Icon/>
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={data} secondary={label} className={styles.detailItem}></ListItemText>
    </ListItem>
  )
}

interface DetailItemProp {
  label: string
  data: string | number
  Icon: React.ElementType
}

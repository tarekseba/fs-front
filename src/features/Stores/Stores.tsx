import React, { ReactNode, useEffect, useState } from "react"
import { Checkbox, FormControlLabel, FormGroup, Grid, Paper, TextField, TextFieldProps, Theme, Typography } from "@mui/material"
import { useAppActions, useAppSelector } from "../../appRedux/hooks"
import { Store, StoreCriteria } from "../../appRedux/slices/storeSlice"
import { RootState } from "../../appRedux/store"
import { Datatable } from "../../shared/Datatable"
import { Column } from "../../shared/utils/types"
import { renderStoresCellActions, StoreCreation } from "./table/renderStoresCellActions"
import { ModalOptions, useModal } from "../../shared/Modal/ModalProvider"
import { StoreCreationForm } from "./table/modalContents/StoreCreationForm"
import { ReactState } from "../../utils/types"
import { DatePicker } from "@mui/x-date-pickers"
import { Dayjs } from "dayjs"
import * as _ from "lodash"
import { makeStyles, ClassNameMap } from "@mui/styles"

const useStyles: () => ClassNameMap<string> = makeStyles((_theme: Theme) => ({
  filtersPaper: {
    display: "flex",
    flexDirection: "column",
    gap: ".5rem",
    padding: "1rem",
    justifyContent: "center",
  }
}))

/* eslint-disable-next-line */
const statusFormatter = (store: Store): ReactNode => {
  const props = { color: store.is_holiday ? "red" : "green" }
  return <Typography {...props}>{store.is_holiday ? "On holiday" : "Open"}</Typography>
}

const dateFormatter = (row: Store) => (
  new Date(row.created_at).toLocaleString().replace(",", " -")
)

const columns_temp: Column<Store>[] = [
  /* { label: "Id", field_name: "id", can_sort: false }, */
  { label: "Nom", field_name: "name", can_sort: true },
  { label: "Status", field_name: "store_id", can_sort: false, formatter: statusFormatter },
  { label: "Products", field_name: "prod_count", can_sort: true },
  { label: "Creation Date", field_name: "created_at", can_sort: true, formatter: dateFormatter }
]

const defaultInitialValues: StoreCreation = {
  name: "",
  is_holiday: false,
  worktimes: [
    { day_id: 1, am_open: undefined, am_close: undefined, pm_open: undefined, pm_close: undefined },
    { day_id: 2, am_open: undefined, am_close: undefined, pm_open: undefined, pm_close: undefined },
    { day_id: 3, am_open: undefined, am_close: undefined, pm_open: undefined, pm_close: undefined },
    { day_id: 4, am_open: undefined, am_close: undefined, pm_open: undefined, pm_close: undefined },
    { day_id: 5, am_open: undefined, am_close: undefined, pm_open: undefined, pm_close: undefined },
    { day_id: 6, am_open: undefined, am_close: undefined, pm_open: undefined, pm_close: undefined },
    { day_id: 7, am_open: undefined, am_close: undefined, pm_open: undefined, pm_close: undefined }
  ]
}

export const Stores = (): JSX.Element => {
  const actions = useAppActions()
  const { stores, searchCriteria } = useAppSelector((state: RootState) => state.store) 
  const { toggleModal }: ModalOptions = useModal()
  const [ open, setOpen ]: ReactState<boolean> = useState(false)
  const [ before, setBefore ]: ReactState<Date | undefined> = useState<Date | undefined>(undefined)
  const [ after, setAfter ]: ReactState<Date | undefined> = useState<Date | undefined>(undefined)

  const styles: ClassNameMap<string> = useStyles()

  const headerAction = () =>  {
    toggleModal({
      title: "New store",
      content: <StoreCreationForm<StoreCreation>
          onSubmitAction={actions.store.create.store} 
          initialValues={defaultInitialValues}
        />
    })
  }

  const onIsOpenChange = () => {
    actions.store.edit.criteria({...searchCriteria, in_holiday: open ? undefined : false })
    setOpen((state: boolean) => !state)
  }

  const onBeforeChange = (value: Dayjs | null) => {
    if (value?.isValid()) {
      setBefore(value.toDate())
    } else if (before) {
      setBefore(undefined)
    }
  }

  const onAfterChange = (value: Dayjs | null) => {
    if (value?.isValid()) {
      setAfter(value.toDate())
    } else if (after) {
      setAfter(undefined)
    }
  }

  useEffect(() => {
    actions.store.get.stores({ ...searchCriteria, before: before, after: after }) 
  }, [before, after])

  return (
    <Grid container justifyContent={"space-between"} >
      <Grid item sm={4} md={3} lg={2}>
        <div style={{marginRight: ".5rem"}}>
          <Paper className={styles.filtersPaper}>
            <FormGroup style={{marginLeft: "-1rem"}}>
              <FormControlLabel style={{marginLeft: "0rem"}} control={<Checkbox />} label={"Open"} value={searchCriteria.in_holiday} checked={open} onClick={onIsOpenChange}></FormControlLabel>
            </FormGroup>
            <div>
              <DatePicker 
                onChange={onBeforeChange} 
                value={before} 
                label={"Before"}
                renderInput={(props: TextFieldProps) => (<TextField style={{width: "auto"}} variant="standard" {...props}/>)}
              />
            </div>
            <div>
              <DatePicker 
                onChange={onAfterChange} 
                value={after} 
                label={"After"}
                renderInput={(props: TextFieldProps) => (<TextField variant="standard" {...props}/>)}
              />
            </div>
          </Paper>
        </div>
      </Grid>
      <Grid item sm={7} md={8} lg={9.5}>
        <Datatable<Store, StoreCriteria>
          loading={false}
          data={stores}
          columns={columns_temp}
          cellActions={renderStoresCellActions()}
          headerAction={headerAction}
          searchCriteria={searchCriteria}
          updateCriteria={actions.store.edit.criteria}
          debouncedUpdateCriteria={_.debounce(actions.store.edit.criteria, 500)}
        />
      </Grid>
    </Grid>
  )}


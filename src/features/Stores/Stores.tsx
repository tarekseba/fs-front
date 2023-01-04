import React, { ReactNode, useEffect } from "react"
import { Grid, Paper, Typography } from "@mui/material"
import { useAppActions, useAppSelector } from "../../appRedux/hooks"
import { Store } from "../../appRedux/slices/storeSlice"
import { RootState } from "../../appRedux/store"
import { Datatable } from "../../shared/Datatable"
import { Column } from "../../shared/utils/types"
import { renderStoresCellActions, StoreCreation } from "./table/renderStoresCellActions"
import { ModalOptions, useModal } from "../../shared/Modal/ModalProvider"
import { StoreCreationForm } from "./table/modalContents/StoreCreationForm"
import { defaultSearchCriteria } from "../../utils/types"
import * as _ from "lodash"

/* eslint-disable-next-line */
const statusFormatter = (store: Store): ReactNode => {
  const props = { color: store.is_holiday ? "red" : "green" }
  return <Typography {...props}>{store.is_holiday ? "On holiday" : "Open"}</Typography>
}

const columns_temp: Column<Store>[] = [
  { label: "Id", field_name: "id", can_sort: false },
  { label: "Nom", field_name: "name", can_sort: false },
  { label: "Status", field_name: "store_id", can_sort: true, formatter: statusFormatter },
  { label: "Date de creation", field_name: "created_at", can_sort: false }
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

  const headerAction = () =>  {
    toggleModal({
      title: "New store",
      content: <StoreCreationForm<StoreCreation>
          onSubmitAction={actions.store.create.store} 
          initialValues={defaultInitialValues}
        />
    })
  }

  useEffect(() => {
    actions.store.get.stores(searchCriteria) 
  }, [])

  return (<Grid container justifyContent={"space-between"} style={{padding: "1rem"}}>
    <Grid item sm={4}  md={3.5}><Paper style={{marginRight: ".5rem"}}>1</Paper></Grid>
    <Grid item sm={8}  md={8.5} style={{backgroundColor: "yellow"}}>
      <Datatable<Store>
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
  )
}


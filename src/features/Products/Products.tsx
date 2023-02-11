import React, { useEffect, useState } from "react"
import { FormControlLabel, Grid, Paper, Radio } from "@mui/material"
import { useAppActions, useAppSelector } from "../../appRedux/hooks"
import { Product } from "../../appRedux/slices/productSlice"
import { RootState } from "../../appRedux/store"
import { Datatable } from "../../shared/Datatable"
import { Column, ReactState } from "../../shared/utils/types"
import { EditProductForm } from "./table/modalContents/EditProductForm"
import { ModalOptions, useModal } from "../../shared/Modal/ModalProvider"
import { renderProductsCellActions } from "./table/renderProductsCellActions"
import EuroSymbolRoundedIcon from "@mui/icons-material/EuroSymbolRounded"
import * as _ from "lodash"

const priceFormatter = (row: Product) => (
  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", color: "#1976d2"}}>
    {row.price} <EuroSymbolRoundedIcon style={{ fontSize: "16px" }}/>
  </div>
)

const dateFormatter = (row: Product) => (
  new Date(row.created_at).toLocaleString().replace(",", " -")
)


export const Products = () => {
  const actions = useAppActions()
	const { products, searchCriteria } = useAppSelector((state: RootState) => state.product) 
  const { toggleModal }: ModalOptions = useModal()
  const i18nNameState: ReactState<boolean> = useState<boolean>(false)
  const i18nDescriptionState: ReactState<boolean> = useState<boolean>(false)

  const headerAction = () =>  {
    toggleModal({
      title: "New product",
      content: <EditProductForm 
          onSubmitAction={actions.product.create.product} 
        />
    })
  }

  const columns_temp: Column<Product>[] = [
    /* { label: "Id", field_name: "id", can_sort:  }, */
    { label: "Nom", field_name: "name", can_sort: true, i18n: i18nNameState },
    { label: "Price", field_name: "price", can_sort: true, formatter: priceFormatter },
    { label: "Description", field_name: "description", can_sort: true, i18n: i18nDescriptionState },
    { label: "Store", field_name: "store_id", can_sort: false },
    { label: "Date de creation", field_name: "created_at", can_sort: true, formatter: dateFormatter }
  ]

	useEffect(() => {
		actions.product.get.products(searchCriteria) 
	}, [])

	return (<Grid container justifyContent={"space-between"} style={{padding: "1rem"}}>
		<Grid item sm={4}  md={3.5}><Paper style={{marginRight: ".5rem"}}>
    </Paper>

    </Grid>
		<Grid item sm={8}  md={8.5} style={{backgroundColor: "yellow"}}>
			<Datatable<Product>
        loading={false}
        data={products}
        columns={columns_temp}
        cellActions={renderProductsCellActions()}
        headerAction={headerAction}
        searchCriteria={searchCriteria}
        updateCriteria={actions.product.edit.criteria}
        debouncedUpdateCriteria={_.debounce(actions.product.edit.criteria, 500)}
      />
		</Grid>
    </Grid>
  )
}

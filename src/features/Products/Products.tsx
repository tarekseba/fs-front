import React, { useEffect } from "react"
import { Grid, Paper } from "@mui/material"
import { useAppActions, useAppSelector } from "../../appRedux/hooks"
import { Product } from "../../appRedux/slices/productSlice"
import { RootState } from "../../appRedux/store"
import { Datatable } from "../../shared/Datatable"
import { Column } from "../../shared/utils/types"
import { EditProductForm } from "./table/modalContents/EditProductForm"
import { ModalOptions, useModal } from "../../shared/Modal/ModalProvider"
import { renderProductsCellActions } from "./table/renderProductsCellActions"
import EuroSymbolRoundedIcon from "@mui/icons-material/EuroSymbolRounded"

const priceFormatter = (row: Product) => (
  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", color: "#1976d2"}}>
    {row.price} <EuroSymbolRoundedIcon style={{ fontSize: "16px" }}/>
  </div>
)

const columns_temp: Column<Product>[] = [
	/* { label: "Id", field_name: "id", can_sort:  }, */
	{ label: "Nom", field_name: "name", can_sort: true },
  { label: "Price", field_name: "price", can_sort: true, formatter: priceFormatter },
  { label: "description", field_name: "description", can_sort: true },
  { label: "Store", field_name: "store_id", can_sort: false },
	{ label: "Date de creation", field_name: "created_at", can_sort: true }
]

export const Products = () => {
  const actions = useAppActions()
	const { products, searchCriteria } = useAppSelector((state: RootState) => state.product) 
  const { toggleModal }: ModalOptions = useModal()

  const headerAction = () =>  {
    toggleModal({
      title: "New product",
      content: <EditProductForm 
          onSubmitAction={actions.product.create.product} 
        />
    })
  }

	useEffect(() => {
		actions.product.get.products(searchCriteria) 
	}, [])

	return (<Grid container justifyContent={"space-between"} style={{padding: "1rem"}}>
		<Grid item sm={4}  md={3.5}><Paper style={{marginRight: ".5rem"}}>1</Paper></Grid>
		<Grid item sm={8}  md={8.5} style={{backgroundColor: "yellow"}}>
			<Datatable<Product>
        loading={false}
        data={products}
        columns={columns_temp}
        cellActions={renderProductsCellActions()}
        headerAction={headerAction}
        searchCriteria={searchCriteria}
        updateCriteria={actions.product.edit.criteria}
      />
		</Grid>
    </Grid>
  )
}

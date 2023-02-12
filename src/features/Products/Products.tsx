import React, { SyntheticEvent, useEffect, useState } from "react"
import { Autocomplete, AutocompleteRenderInputParams, Box, Grid, Link, Paper, Radio, TextField, Theme } from "@mui/material"
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
import { AutocompleteData, defaultSearchCriteria } from "../../utils/types"
import { Category } from "../../appRedux/slices/categoriesSlice"
import { ClassNameMap, makeStyles } from "@mui/styles"

const useStyles: () => ClassNameMap<string> = makeStyles((_theme: Theme) => ({
  filtersPaper: {
    display: "flex",
    flexDirection: "column",
    gap: ".5rem",
    padding: "1rem",
    justifyContent: "center",
  }
}))

const priceFormatter = (row: Product) => (
  <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", color: (theme: Theme) => theme.palette.primary.dark}}>
    {row.price} <EuroSymbolRoundedIcon style={{ fontSize: "16px" }}/>
  </Box>
)

const dateFormatter = (row: Product) => (
  new Date(row.created_at).toLocaleString().replace(",", " -")
)

const storeFormatter = (row: Product) => row.store ? <Link onClick={() => alert("hello")}>{row.store.name}</Link> : "-"

export const Products = () => {
  const actions = useAppActions()
	const { products, searchCriteria } = useAppSelector((state: RootState) => state.product) 
	const { categories, searchCriteria: catSearchCriteria } = useAppSelector((state: RootState) => state.category) 
  const { toggleModal }: ModalOptions = useModal()
  const [ selected, setSelected ]: ReactState<any> = useState(undefined)
  const i18nNameState: ReactState<boolean> = useState<boolean>(false)
  const i18nDescriptionState: ReactState<boolean> = useState<boolean>(false)

  const styles: ClassNameMap<string> = useStyles()

  const headerAction = () =>  {
    toggleModal({
      title: "New product",
      content: <EditProductForm 
          onSubmitAction={actions.product.create.product} 
        />
    })
  }

  const selectHandler = (_event: SyntheticEvent, value: any) => {
    setSelected(value?.value)
    actions.product.edit.criteria({...defaultSearchCriteria, category_id: value?.value})
  }

  const handleChange = (_e: SyntheticEvent, value: string) => {
    actions.category.get.categories({...defaultSearchCriteria, name: value})
  }

  const renderInput = (params: AutocompleteRenderInputParams) => <TextField variant="standard" style={{maxWidth: "auto"}} {...params} label={"Categories"}/>

  const options: AutocompleteData<number>[] = categories && categories.result ? categories.result.map((category: Category) => ({ value: category.id, label: category.name } as AutocompleteData<number>)) : []

  const columns_temp: Column<Product>[] = [
    /* { label: "Id", field_name: "id", can_sort:  }, */
    { label: "Nom", field_name: "name", can_sort: true, i18n: i18nNameState },
    { label: "Price", field_name: "price", can_sort: true, formatter: priceFormatter },
    { label: "Description", field_name: "description", can_sort: true, i18n: i18nDescriptionState },
    { label: "Store", field_name: "store.name", can_sort: false, formatter: storeFormatter },
    { label: "Creation date", field_name: "created_at", can_sort: true, formatter: dateFormatter }
  ]

	useEffect(() => {
		actions.product.get.products(searchCriteria) 
    actions.category.resetField("categories")
	}, [])

	return (
    <Grid container justifyContent={"space-between"}>
      <Grid item sm={4} md={3} lg={2}>
        <div style={{marginRight: ".5rem"}}>
          <Paper className={styles.filtersPaper}>
            <Autocomplete<AutocompleteData<number>>
              renderInput={renderInput}
              options={options}
              onChange={selectHandler}
              onInputChange={handleChange}
            />
          </Paper>
        </div>
      </Grid>
      <Grid item sm={7} md={8} lg={9.5}>
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

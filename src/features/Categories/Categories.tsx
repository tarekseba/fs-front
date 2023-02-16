import React, { useEffect } from "react"
import { Box, Grid, Paper } from "@mui/material"
import { useAppActions, useAppSelector } from "../../appRedux/hooks"
import { Category } from "../../appRedux/slices/categoriesSlice"
import { RootState } from "../../appRedux/store"
import { Datatable } from "../../shared/Datatable"
import { Column } from "../../shared/utils/types"
import { categoriesCellActions } from "./table/renderCategoriesCellActions"
import { ModalOptions, useModal } from "../../shared/Modal/ModalProvider"
import { EditCategoryForm } from "./table/modalContents/EditCategoryForm"
import * as _ from "lodash"

const dateFormatter = (row: Category) => (
  new Date(row.created_at).toLocaleString().replace(",", " -")
)

const columns_temp: Column<Category>[] = [
	{
		label: "Id",
		field_name: "id",
		can_sort: true
	},
	{
		label: "Nom",
		field_name: "name",
		can_sort: true
	},
	{
		label: "Date de creation",
		field_name: "created_at",
		can_sort: true,
    formatter: dateFormatter
	},
]

export const Categories = () => {
	const actions = useAppActions()
	const { categories, searchCriteria, loading } = useAppSelector((state: RootState) => state.category) 
  const { toggleModal }: ModalOptions = useModal()

  const headerAction = () =>  {
    toggleModal({
      title: "New category",
      content: <EditCategoryForm 
          onSubmitAction={actions.category.create.category} 
        />
    })
  }

	useEffect(() => {
		actions.category.get.categories(searchCriteria) 
	}, [])
	return (
    <Box style={{margin: "auto"}}>
      <Grid item sm={7} md={8} lg={9.5}>
        {/* <Grid container columnSpacing={2} xs={12} style={{marginLeft: ".5rem", backgroundColor: "black", minHeight: "90vh"}}> */}
        {/* 	{loading  */}
        {/* 		? <CircularProgress/>  */}
        {/* 		: <>{categories?.result?.map((cat: Category) => ( */}
        {/* 			<Grid item xs={6} md={4} key={`${cat.name}_${cat.id}`}> */}
        {/* 				<CategoryChip category={cat} isAdmin={true} isLoading={false} deleteCategory={undefined}></CategoryChip> */}
        {/* 			</Grid> */}
        {/* 		))}</>} */}
        {/* </Grid> */}
        <Datatable<Category> 
          loading={loading}
          data={categories}
          columns={columns_temp}
          cellActions={categoriesCellActions()}
          headerAction={headerAction}
          searchCriteria={searchCriteria}
          updateCriteria={actions.category.edit.criteria}
          debouncedUpdateCriteria={_.debounce(actions.category.edit.criteria, 500)}
        />
      </Grid>
    </Box>
  )}

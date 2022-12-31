import React, { useEffect } from "react"
import { Grid, Paper, Theme } from "@mui/material"
import { makeStyles, ClassNameMap } from "@mui/styles"
import { useAppActions, useAppSelector } from "../../appRedux/hooks"
import { Category } from "../../appRedux/slices/categoriesSlice"
import { RootState } from "../../appRedux/store"
import { Datatable } from "../../shared/Datatable"
import { Column } from "../../shared/utils/types"
import { categoriesCellActions } from "./table/renderCategoriesCellActions"
import { ModalOptions, useModal } from "../../shared/Modal/ModalProvider"
import { EditCategoryForm } from "./table/modalContents/EditCategoryForm"

const useStyles: () => ClassNameMap<any> = makeStyles((_theme: Theme) => ({
	container: {
		backgroundColor: "green",
		/* marginLeft: 0 */
	},
	catGrid: {
		backgroundColor: "red",
		margin: "1rem"
	},
	filtersGrid: {
		backgroundColor: "yellow",
		margin: "1rem"
	}
}))

const columns_temp: Column<Category>[] = [
	{
		label: "Id",
		field_name: "id",
		can_sort: false
	},
	{
		label: "Nom",
		field_name: "name",
		can_sort: false
	},
	{
		label: "Date de creation",
		field_name: "created_at",
		can_sort: false
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
	return <Grid container justifyContent={"space-between"} style={{padding: "1rem"}}>
		<Grid item sm={4}  md={3.5}><Paper style={{marginRight: ".5rem"}}>1</Paper></Grid>
		<Grid item sm={8}  md={8.5} style={{backgroundColor: "yellow"}}>
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
      />
		</Grid>
	</Grid>
}

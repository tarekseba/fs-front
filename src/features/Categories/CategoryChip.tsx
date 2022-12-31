import React from "react"
import { IconButton, Paper, Theme, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Category } from "../../appRedux/slices/categoriesSlice"
import DeleteIcon from "@mui/icons-material/Delete"

const useStyles = makeStyles((theme: Theme) => ({
	chipContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-evenly",
		paddingLeft: ".3rem",
		cursor: "pointer",
		/* backgroundColor: "rgb(248,248,255)", */
		backgroundColor: "rgb(239 239 239 / 74%)",
		"&:hover": {
			transform: "scale(1.05) translatey(3px)",
			transition: "transform 250ms ease-in-out"
		}
	}
}))

interface Props {
  category?: Category
  isAdmin?: boolean
  isLoading?: boolean
  deleteCategory?: () => any
}
export const CategoryChip = ({category, isAdmin, isLoading = false, deleteCategory}: Props) => {
	const classes = useStyles()

	return <Paper className={classes.chipContainer}>
		<Typography>{category?.name}</Typography> 
		{ isAdmin && (<IconButton onClick={deleteCategory} style={{marginLeft: "auto"}}><DeleteIcon/></IconButton>)}
	</Paper>
}

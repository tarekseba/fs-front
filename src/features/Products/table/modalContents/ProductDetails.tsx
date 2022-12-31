import React, { useState } from "react"
import { Box, Chip, Divider, Grid, Stack, Typography } from "@mui/material"
import { Product } from "../../../../appRedux/slices/productSlice"
import EuroSymbolRoundedIcon from "@mui/icons-material/EuroSymbolRounded"
import { Category } from "../../../../appRedux/slices/categoriesSlice"
import { MainActions } from "../../../../appRedux/types"
import { useAppActions } from "../../../../appRedux/hooks"
import { ReactState } from "../../../../utils/types"

interface Props {
  product: Product
}


export const ProductDetails = ({product}: Props) => {
  const [ item, setItem ]: ReactState<Product> = useState(product)
  const actions: MainActions = useAppActions()

  const onDeleteCategory = (categoryId: number) => () => { 
    actions.product.edit.dettachCategory(item?.id, categoryId)  .then(() => {
      setItem((state: Product) => ({
        ...state,
        categories: state?.categories?.filter((category: Category) => categoryId !== category.id )}))
    })
  }

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Box sx={{ my: 3, mx: 2 }}>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography gutterBottom variant="h4" component="div">
                {item?.name}
              </Typography>
            </Grid>
            <Grid item display={"flex"} alignItems="center" color={"#1976d2"}>
              <Typography gutterBottom variant="h6" style={{margin: 0}}>
                {item?.price}
              </Typography>
              <EuroSymbolRoundedIcon style={{ fontSize: "18px", color: "#1976d2" }}/>
            </Grid>
          </Grid>
          <Typography color="text.secondary" variant="body2">
            {item?.description || "No description"} 
          </Typography>
        </Box>
        <Divider variant="middle" />
        <Box sx={{ m: 2 }}>
          <Typography gutterBottom variant="body1">
            Categories 
          </Typography>
          <Stack direction="row" spacing={1}>
            {item?.categories?.map((category: Category, index: number) => (<Chip label={category.name} key={`${category.name}_${index}`} onDelete={onDeleteCategory(category.id)}/>))}
          </Stack>
        </Box>
      </Box>
  )
}

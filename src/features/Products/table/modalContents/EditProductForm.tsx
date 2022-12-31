import { Form, Formik, FormikProps } from "formik"
import React, { useState } from "react"
import { Product } from "../../../../appRedux/slices/productSlice"
import * as yup from "yup"
import { ReactState } from "../../../../utils/types"
import { ModalOptions, useModal } from "../../../../shared/Modal/ModalProvider"
import { FormikTextField } from "../../../../shared/FormikTextField"
import { Button, Grid, Theme } from "@mui/material"
import { ClassNameMap, makeStyles } from "@mui/styles"
import EuroSymbolRoundedIcon from "@mui/icons-material/EuroSymbolRounded"

const useStyles: () => ClassNameMap<string> = makeStyles((theme: Theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    paddingTop: "1rem"
  }
}))

export interface ProductEdition {
  name: string
  description: string
  price: number
  store_id?: number
}

const validationSchema = yup.object({
  name: yup.string().required().min(3).max(256),
  description: yup.string().required().min(3).max(256),
  price: yup.number().required().min(0),
})

interface Props {
  product?: Product
  onSubmitAction: (values: ProductEdition) => Promise<any>
}

export const EditProductForm = ({ product, onSubmitAction }: Props) => {
  const [isSubmitting, setIsSubmitting]: ReactState<boolean> = useState<boolean>(false)
  const { toggleModal }: ModalOptions = useModal()
  const classes: ClassNameMap<string> = useStyles()

  const submitHandler = (values: ProductEdition) => {
    setIsSubmitting(true)
    onSubmitAction(values)
      .then(() => toggleModal())
      .finally(() => setIsSubmitting(false))
  }

  const initialValues: ProductEdition = {
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 10
  }

  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={submitHandler}
      validationSchema={validationSchema}
      validateOnBlur
      validateOnChange
    >
      {(props: FormikProps<ProductEdition>) => (
        <Form className={classes.form}>
          <Grid container>
            <Grid item xs={9} padding={1}>
              <FormikTextField name="name" type="text" label="Name" fullWidth/>
            </Grid>
            <Grid item xs={3} padding={1}>
              <FormikTextField name="price" type="number" label="Price" InputProps={{startAdornment: <EuroSymbolRoundedIcon style={{fontSize: "16px"}}/>}} fullWidth/>
            </Grid>
            <Grid xs={12} padding={1}>
              <FormikTextField name="description" type="text" label="Description" fullWidth />
            </Grid>
          </Grid> 
          <Button type="submit" variant="contained" style={{marginTop: 16}} disabled={!props.isValid && !isSubmitting}>Submit</Button>
        </Form>
      )}
    </Formik>
  )
}

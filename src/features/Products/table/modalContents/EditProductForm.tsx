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
  i18n_name?: string
  description?: string
  i18n_description?: string
  price: number
  store_id?: number
}

const validationSchema = yup.object({
  name: yup.string().required().min(3).max(256),
  i18n_name: yup.string().min(3).max(256),
  price: yup.number().required().min(0),
  description: yup.string().required().min(3).max(256),
  i18n_description: yup.string().min(3).max(256),
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
    i18n_name: product?.i18n_name || "",
    description: product?.description || "",
    i18n_description: product?.i18n_description || "",
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
            <Grid item xs={4.5} padding={1}>
              <FormikTextField name="name" type="text" label="Name" fullWidth/>
            </Grid>
            <Grid item xs={4.5} padding={1}>
              <FormikTextField name="i18n_name" type="text" label="Secondary name" fullWidth/>
            </Grid>
            <Grid item xs={3} padding={1}>
              <FormikTextField name="price" type="number" label="Price" InputProps={{startAdornment: <EuroSymbolRoundedIcon style={{fontSize: "16px"}}/>}} fullWidth/>
            </Grid>
            <Grid xs={12} padding={1}>
              <FormikTextField name="description" type="text" label="Description" fullWidth />
            </Grid>
            <Grid xs={12} padding={1}>
              <FormikTextField name="i18n_description" type="text" label="Secondary description" fullWidth />
            </Grid>
          </Grid> 
          <Button type="submit" variant="contained" style={{marginTop: 16}} disabled={!props.isValid && !isSubmitting}>Submit</Button>
        </Form>
      )}
    </Formik>
  )
}

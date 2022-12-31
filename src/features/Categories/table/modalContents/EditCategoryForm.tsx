import React, { useState } from "react"
import { Formik, Form, FormikValues, FormikProps } from "formik"
import * as yup from "yup"
import { FormikTextField } from "../../../../shared/FormikTextField"
import { Button, ClassNameMap, Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Category } from "../../../../appRedux/slices/categoriesSlice"
import { ReactState } from "../../../../utils/types"
import { useModal } from "../../../../shared/Modal/ModalProvider"

const validationSchema = yup.object({
  name: yup.string().required().min(3).max(256)
})

export interface CategoryEdition {
  name: string
}

const useStyles: () => ClassNameMap<string> = makeStyles((theme: Theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    paddingTop: "1rem"
  }
}))

interface Props {
  category?: Category
  onSubmitAction: (values: CategoryEdition) => Promise<any>
}

export const EditCategoryForm = ({ category, onSubmitAction }: Props) => {
  const classes: ClassNameMap<string> = useStyles()
  const [ isSubmitting, setIsSubmitting ]: ReactState<boolean> = useState<boolean>(false)
  const { toggleModal } = useModal()

  const submitHandler = (values: CategoryEdition) => {
    setIsSubmitting(true)
    onSubmitAction(values)
      .then(() => toggleModal())
      .finally(() => setIsSubmitting(false))
  }

  return (
    <Formik 
      initialValues={{name: category?.name || ""}} 
      onSubmit={submitHandler}
      validationSchema={validationSchema}
      validateOnBlur
      validateOnChange
    >
      {(props: FormikProps<CategoryEdition>) => (
        <Form className={classes.form}>
          <FormikTextField name="name" type="text" label="Name" fullWidth/>
          <Button type="submit" variant="contained" style={{marginTop: 16}} disabled={!props.isValid && !isSubmitting}>Submit</Button>
        </Form>
      )}
    </Formik>
  )

}

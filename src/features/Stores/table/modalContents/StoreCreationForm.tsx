import React, { useState } from "react"
import { Button, Divider, Grid, Theme, Typography } from "@mui/material"
import { Field, Form, Formik, FormikProps } from "formik"
import { FormikTextField } from "../../../../shared/FormikTextField"
import { ClassNameMap, makeStyles } from "@mui/styles"
import { StoreCreation } from "../renderStoresCellActions"
import * as yup from "yup"
import { ReactState } from "../../../../utils/types"
import { ModalOptions, useModal } from "../../../../shared/Modal/ModalProvider"

const useStyles: () => ClassNameMap<string> = makeStyles((theme: Theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "1rem"
  },
  textfield: {
    width: "2rem"
  }
}))

interface Props<T> {
  onSubmitAction: (values: T) => Promise<any>
  initialValues: T
}

const daysOfWeek: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const validationSchema = yup.object({
  name: yup.string().required().min(3).max(256),
  is_holiday: yup.boolean().required(),
  worktimes: yup.array().of(
    yup.object({
      day_id: yup.number().required(),
      am_open: yup.string().matches(/^(0[0-9]|1[0-2]):[0-5][0-9]$/),
      am_close: yup.string().matches(/^(0[0-9]|1[0-2]):[0-5][0-9]$/),
      pm_open: yup.string().matches(/^(0[0-9]|1[0-2]):[0-5][0-9]$/),
      pm_close: yup.string().matches(/^(0[0-9]|1[0-2]):[0-5][0-9]$/),
    })
  )
})

export const StoreCreationForm = <T extends object>({ onSubmitAction, initialValues }: Props<T>) => {
  const [ isSubmitting, setIsSubmitting ]: ReactState<boolean> = useState<boolean>(false)
  const { toggleModal }: ModalOptions = useModal()
  const styles = useStyles()

  const onSubmit = (values: T) => {
    setIsSubmitting(true)
    onSubmitAction(values)
      .then(() => toggleModal())
      .finally(() => setIsSubmitting(false))
  }
  return (
    <Formik<T>
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnBlur
      validateOnMount
      validateOnChange
      validationSchema={validationSchema}
    >{(props: FormikProps<T>) => 
      <Form className={styles.form}>
        <Grid container>
          <Grid item xs={9} padding={1}>
            <FormikTextField name="name" type="text" label="Name" fullWidth/>
          </Grid>
          <Grid item xs={3} padding={1} style={{display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "center"}}>
            <label>
              On break
              <Field name="is_holiday" type="checkbox" />
            </label>
          </Grid>
        </Grid>
        <Divider sx={{mt: 2, mb: 2}}/>
        <Typography variant="h6">Work hours</Typography>
        <table>
        {daysOfWeek.map((day: string, index: number) => (
          <tr key={`${day}-${index}`}>
            <td>
              <Typography variant="subtitle1">{day}</Typography>
            </td>
            <td>
              <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <FormikTextField style={{width: "4rem", marginRight: ".5rem"}} name={`worktimes[${index}].am_open`}/>
                <Typography variant="h5" fontWeight="bold">-</Typography>
                <FormikTextField style={{width: "4rem", marginLeft: ".5rem"}} name={`worktimes[${index}].am_close`}></FormikTextField>
                <Typography variant="subtitle1" fontWeight="bold" style={{marginLeft: ".5rem"}}>AM</Typography>
              </div>
            </td>
            <td>
              <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <FormikTextField style={{width: "4rem", marginRight: ".5rem"}} name={`worktimes[${index}].pm_open`}/>
                <Typography variant="h5" fontWeight="bold">-</Typography>
                <FormikTextField style={{width: "4rem", marginLeft: ".5rem"}} name={`worktimes[${index}].pm_close`}></FormikTextField>
                <Typography variant="subtitle1" fontWeight="bold" style={{marginLeft: ".5rem"}}>PM</Typography>
              </div>
            </td>
          </tr>
        ))}
        </table>
        <Button type="submit" variant="contained" style={{marginTop: 16, marginLeft: "auto"}} disabled={!props.isValid || isSubmitting}>Submit</Button>
      </Form>
    }
    </Formik>
  )
}

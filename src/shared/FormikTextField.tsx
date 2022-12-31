import React from "react"
import { TextField, TextFieldProps, Theme } from "@mui/material"
import { Field, FieldProps } from "formik"
import * as _ from "lodash"
import { ClassNameMap, makeStyles } from "@mui/styles"

const useStyles: () => ClassNameMap<string> = makeStyles((theme: Theme) => ({
  textfield: {
    "& > .MuiInputBase-root": {
      height: "2.2rem"
    }
  }
}))

export const FormikTextField = (props: TextFieldProps) => <Field {...props} component={FkTextField}/>

const FkTextField = ({field, form, ...other}: FieldProps<string>) => {
  const classes: ClassNameMap<string> = useStyles()

  const { errors, touched } = form
  const { value, name } = field
  const error = _.get(errors, name)
  const fieldTouched = _.get(touched, name)
  return <TextField 
    variant="standard"
    {...field} 
    {...other} 
    value={value || ""} 
    error={Boolean(error)}
    helperText={fieldTouched && error}
    className={classes.textfield}
    />
}

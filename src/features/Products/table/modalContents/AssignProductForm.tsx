import React, { SyntheticEvent, useState } from "react"
import { Autocomplete, AutocompleteRenderInputParams, Button, TextField } from "@mui/material"
import { Product } from "../../../../appRedux/slices/productSlice"
import { ModalOptions, useModal } from "../../../../shared/Modal/ModalProvider"
import { AutocompleteData, ReactState } from "../../../../utils/types"
import * as _ from "lodash"

interface Props {
  product: Product
  onAssignAction: (productId: number, storeId: number) => Promise<any>
  onSearch: (text: string) => void
  label: string
}


export const AssignProductForm = ({ onAssignAction, onSearch, product, label }: Props): JSX.Element => {
  const [ inputValue, setInputValue ]: ReactState<string> = useState<string>("")
  const [ selected, setSelected ]: ReactState<any> = useState(undefined)
  const [ isSubmitting, setIsSubmitting ]: ReactState<boolean> = useState(false)
  const { toggleModal, dynamicProps }: ModalOptions<any> = useModal()

  const renderInput = (params: AutocompleteRenderInputParams) => <TextField {...params} label={label}/>
  const selectHandler = (_event: SyntheticEvent, value: any) => {
    setSelected(value?.value)
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    onAssignAction(product?.id, selected)
      .then(() => toggleModal())
      .finally(() => setIsSubmitting(false))
  }

  const handleChange = (_e: SyntheticEvent, value: string) => {
    onSearch(value)
    setInputValue(value)
  }

  const options: AutocompleteData<number>[] = dynamicProps?.data ? 
    dynamicProps?.data.map((element: any) => ({ label: element.name, value: element.id })) : 
    []

  return <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-end"}}>
    <Autocomplete<AutocompleteData<number>>
      renderInput={renderInput}
      options={options}
      onChange={selectHandler}
      onInputChange={handleChange}
      fullWidth
    />
    <Button 
      variant="contained"
      onClick={handleSubmit}
      style={{marginTop: "1rem"}}
      disabled={!selected && !isSubmitting}
    >
      Submit
    </Button>
  </div>
}

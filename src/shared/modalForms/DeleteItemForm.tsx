import React, { useState } from "react"
import { Button, Typography } from "@mui/material"
import { ReactState } from "../utils/types"
import { ModalOptions, useModal } from "../Modal/ModalProvider"

interface Props<T> {
  item: T
  deleteAction: (itemId: number) => Promise<any>
}

export const DeleteItemForm = <T extends { id: number }>({ item, deleteAction }: Props<T>): JSX.Element => {
  const [ isSubmitting, setIsSubmitting ]: ReactState<boolean> = useState<boolean>(false)
  const { toggleModal }: ModalOptions = useModal()
  const submitHandler = () => {
    setIsSubmitting(true)
    deleteAction(item.id)
      .then(() => toggleModal())
      .finally(() => setIsSubmitting(false))
  }
  return <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
    <Typography>Are you sure you want to delete this item? This action is irreversible</Typography>
    <div style={{display: "flex", alignItems: "flex-end", justifyContent: "flex-end", marginTop: "1rem"}}>
      <Button type="button" variant="contained" onClick={submitHandler} disabled={isSubmitting}>Confirm</Button>
    </div>
  </div>
}

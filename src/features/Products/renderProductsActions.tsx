import React from "react"
import { Product } from "../../appRedux/slices/productSlice"
import { ActionMenu, IAction } from "../../shared/ActionMenu"

/* eslint-disable-next-line */
export const renderProductsActions = (actions: any = undefined) => (row: Product): JSX.Element => {
  const productActions: IAction[] = [
    {label: "Details", onClick:undefined, visible: true},
    {label: "Delete", onClick:undefined, visible: true}
  ]

  return (
    <ActionMenu
      actionLabel="Actions"
      actions={productActions}
      variant={"contained"}
      />
  )
}

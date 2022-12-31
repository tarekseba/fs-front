import React from "react"
import { ActionMenu, IAction } from "../../shared/ActionMenu"

/* eslint-disable-next-line */
export const renderStoresActions = () => (): JSX.Element => {
  const storesActions: IAction[] = [
    { label: "Delete", onClick: () => alert("todo"), visible: true }
  ]
  return <ActionMenu actions={storesActions} />
}

import React from "react"
import { Category } from "../../../appRedux/slices/categoriesSlice"
import { ActionMenu } from "../../../shared/ActionMenu"
import { ModalParams } from "../../../shared/Modal/Modal"
import { useModal } from "../../../shared/Modal/ModalProvider"
import { EditCategoryForm, CategoryEdition } from "./modalContents/EditCategoryForm"
import { useAppActions } from "../../../appRedux/hooks"
import { MainActions } from "../../../appRedux/types"
import { DeleteItemForm } from "../../../shared/modalForms/DeleteItemForm"

/* eslint-disable-next-line */
export const categoriesCellActions = (actions: any = undefined) => (row: Category): JSX.Element => {
  return (
		<CateogriesCellActions category={row}/>
	)
}

const CateogriesCellActions = ({ category: item }: { category: Category }) => {
  const { toggleModal } = useModal()
  const { category }: MainActions = useAppActions()

  const openModal = (action: string) => () => {
    toggleModal(
      buildModalContent(
        action, 
        item,
        (values: CategoryEdition) => { 
          return category.edit.category(item.id, values) },
        category.delete.category
      )
    )
  }

  const cellActions = [
    {label: "Edit category", visible: true, onClick: openModal("EDIT_CATEGORY")}, 
    {label: "Delete", visible: true, onClick: openModal("DELETE_CATEGORY")}
  ]

  return (
    <ActionMenu
      actionLabel="Actions"
      variant="contained"
      actions={cellActions}
    />
  )
}


const buildModalContent = (
  modalAction: string,
  category: Category,
  editAction: (category: CategoryEdition) => Promise<any>,
  deleteAction: (categoryId: number) => Promise<any>
): ModalParams => {
  return {
    EDIT_CATEGORY: {
      title: "Edit category",
      content: <EditCategoryForm 
          category={category}
          onSubmitAction={editAction}
        />
    },
    DELETE_CATEGORY: {
      title: "Delete category",
      content: <DeleteItemForm 
          item={category} 
          deleteAction={deleteAction} 
        />
    }
  }[modalAction] as ModalParams
}

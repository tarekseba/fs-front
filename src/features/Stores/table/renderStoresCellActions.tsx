import React from "react"
import { NavigateFunction, useNavigate } from "react-router"
import { useAppActions } from "../../../appRedux/hooks"
import { Store, Worktime } from "../../../appRedux/slices/storeSlice"
import { MainActions } from "../../../appRedux/types"
import { ActionMenu } from "../../../shared/ActionMenu"
import { ModalParams } from "../../../shared/Modal/Modal"
import { useModal } from "../../../shared/Modal/ModalProvider"
import { EditProductForm, ProductEdition } from "../../Products/table/modalContents/EditProductForm"
import { StoreCreationForm } from "./modalContents/StoreCreationForm"

export interface StoreEdition {
  name: string
  is_holiday: boolean
  worktimes: Worktime[]
}

export interface StoreCreation {
  name: string
  is_holiday: boolean
  worktimes: WorktimeCreation[]
}

export interface WorktimeCreation {
    day_id: number,
    am_open?: string,
    am_close?: string,
    pm_open?: string,
    pm_close?: string,
}

interface Props {
  store: Store
}

/* eslint-disable-next-line */
export const renderStoresCellActions = () => (row: Store): JSX.Element => {
  return <StoresCellActions store={row}/>
}

const StoresCellActions = ({ store: item }: Props): JSX.Element => {
  const { toggleModal } = useModal()
  const { product, store }: MainActions = useAppActions()

  const navigate: NavigateFunction = useNavigate()

  const goToStore = () => { 
    navigate(`/store/detail/${item.id}`) 
  }

  const onAddProduct = (values: ProductEdition) => product.create.product({ ...values, store_id: item.id })

  const onEditStore = (values: Store) => store.edit.store(values.id, {
    name: values.name, 
    is_holiday: values.is_holiday, 
    worktimes: values.worktimes
  })

  const openModal = (action: string) => () => {
    toggleModal(
      buildModalContent(
        action, 
        item,
        onAddProduct,
        onEditStore
      )
    )
  }

  const cellActions = [
    {label: "Details", visible: true, onClick: goToStore}, 
    {label: "Add product", visible: true, onClick: openModal("ADD_PRODUCT")}, 
    {label: "Edit store", visible: true, onClick: openModal("EDIT_STORE")}, 
    {label: "Delete", visible: true, onClick: openModal("DELETE_PRODUCT")}
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
  store: Store,
  onAddProduct: (values: ProductEdition) => Promise<any>,
  onCreateStore: (values: Store) => Promise<any>
  /* editAction: (store: StoreEdition) => Promise<any>, */
  /* deleteAction: (storeId: number) => Promise<any>, */
  /* assignCategoryAction: (productId: number, storeId: number) => Promise<any>, */
  /* onSearchStores: (text: string) => void, */
  /* onSearchCategories: (text: string) => void, */
): ModalParams => {
  return {
    DETAILS: {
      title: "Details",
      content: <div/>
    },
    ADD_PRODUCT: {
      title: "Add a product",
      content: <EditProductForm onSubmitAction={ onAddProduct } />
    },
    EDIT_STORE: {
      title: "Edit store",
      content: <StoreCreationForm<Store>
        onSubmitAction={onCreateStore} 
        initialValues={store}        
        />
    },
    DELETE_STORE: {
      title: "Delete product",
      content: <div />
    }
  }[modalAction] as ModalParams
}


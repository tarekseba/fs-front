import React, { useEffect } from "react"
import { Product } from "../../../appRedux/slices/productSlice"
import { ActionMenu } from "../../../shared/ActionMenu"
import { ModalParams } from "../../../shared/Modal/Modal"
import { ModalOptions, useModal } from "../../../shared/Modal/ModalProvider"
import { EditProductForm, ProductEdition } from "./modalContents/EditProductForm"
import { useAppActions, useAppSelector } from "../../../appRedux/hooks"
import { MainActions } from "../../../appRedux/types"
import { DeleteItemForm } from "../../../shared/modalForms/DeleteItemForm"
import { AssignProductForm } from "./modalContents/AssignProductForm"
import { RootState } from "../../../appRedux/store"
import { StoreState } from "../../../appRedux/slices"
import * as _ from "lodash"
import { CategoryState } from "../../../appRedux/slices/categoriesSlice"
import { ProductDetails } from "./modalContents/ProductDetails"

/* eslint-disable-next-line */
export const renderProductsCellActions = (actions: any = undefined ) => (row: Product): JSX.Element => {
  return (
		<ProductsCellActions product={row}/>
	)
}

const ProductsCellActions = ({ product: item }: { product: Product }) => {
  const { toggleModal } = useModal()
  const { product, store, category }: MainActions = useAppActions()
  const { stores, searchCriteria }: StoreState = useAppSelector((state: RootState) => state.store)
  const { categories, searchCriteria: categoriesCriteria }: CategoryState = useAppSelector((state: RootState) => state.category)
  const { setDynamicProps }: ModalOptions = useModal()

  const onSearchStores = (text: string) => {
    store.edit.criteria({...searchCriteria, name: text, description: text})
  }

  const onSearchCategories = (text: string) => {
    category.edit.criteria({ ...categoriesCriteria, name: text })
  }

  useEffect(() => {
    setDynamicProps(item)
  }, [ item ])

  useEffect(() => {
    setDynamicProps({ data: stores?.result ? stores?.result : [] })
  }, [ stores ])

  useEffect(() => {
    setDynamicProps({ data: categories?.result ? categories?.result : [] })
  }, [ categories ])

  const openModal = (action: string) => () => {
    setDynamicProps({})
    toggleModal(
      buildModalContent(
        action, 
        item,
        (values: ProductEdition) => product.edit.product(item.id, values),
        product.edit.attachStore,
        product.delete.product,
        product.edit.attachCategory,
        onSearchStores,
        onSearchCategories
      )
    )
  }

  const cellActions = [
    {label: "Details", visible: true, onClick: openModal("SHOW_DETAILS")}, 
    {label: "Edit product", visible: true, onClick: openModal("EDIT_PRODUCT")}, 
    {label: "Add to store", visible: true, onClick: openModal("ATTACH_STORE")}, 
    {label: "Add category", visible: true, onClick: openModal("ATTACH_CATEGORY")}, 
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

const getShowDetails = (product: Product, onDeleteCategory: any, setDynamicProps: any) => {
  setDynamicProps(product)
  return {
  }
}

const buildModalContent = (
  modalAction: string,
  product: Product,
  editAction: (product: ProductEdition) => Promise<any>,
  assignStoreAction: (productId: number, storeId: number) => Promise<any>,
  deleteAction: (productId: number) => Promise<any>,
  assignCategoryAction: (productId: number, storeId: number) => Promise<any>,
  onSearchStores: (text: string) => void,
  onSearchCategories: (text: string) => void
): ModalParams => {
  return {
    SHOW_DETAILS: {
      title: "Product",
      content: <ProductDetails 
          product={product} 
        />
    },
    EDIT_PRODUCT: {
      title: "Edit product",
      content: <EditProductForm 
          product={product}
          onSubmitAction={[editAction, undefined]}
        />
    },
    ATTACH_STORE: {
      title: "Select a store",
      content: <AssignProductForm 
          product={product}
          onAssignAction={assignStoreAction}
          label={"Stores"} 
          onSearch={_.debounce(onSearchStores, 500)}
        />
    },
    ATTACH_CATEGORY: {
      title: "Select a category",
      content:
        <AssignProductForm 
          product={product}
          onAssignAction={assignCategoryAction}
          label={"Categories"} 
          onSearch={_.debounce(onSearchCategories, 500)}
        />
    },
    DELETE_PRODUCT: {
      title: "Delete product",
      content: <DeleteItemForm 
          item={product} 
          deleteAction={deleteAction} 
        />
    }
  }[modalAction] as ModalParams
}

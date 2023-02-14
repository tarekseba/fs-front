import { deleteAction, get, post, put } from "../../core/thunks"
import { ProductEdition } from "../../features/Products/table/modalContents/EditProductForm"
import { SearchCriteria } from "../../utils/types"
import { ProductSearchCriteria } from "../slices/productSlice"

export const productActions = {
  get: {
    product: (id: number): any => get("GET_PRODUCT", `/product/${id}`),
    products: (searchCriteria: ProductSearchCriteria): any => get("GET_PRODUCTS", "/product", searchCriteria),
    storeProducts: (searchCriteria: ProductSearchCriteria, storeId: number) => get("GET_STORE_PRODUCTS", `/product/store/${storeId}`, searchCriteria)
  },
  create: {
    product: (product: ProductEdition) => post("CREATE_PRODUCT", "/product", product)
  },
  edit: {
    product: (id: number, product: ProductEdition) => put("EDIT_PRODUCT", `/product/${id}`, product),
    attachStore: (productId: number, storeId: number) => put("ATTACH_STORE", `/product/${productId}/store/${storeId}`),
    attachCategory: (productId: number, categoryId: number) => put("ATTACH_CATEGORY", `/product/${productId}/category/${categoryId}`),
    dettachCategory: (productId: number, categoryId: number) => deleteAction("DETTACH_CATEGORY", `/product/${productId}/category/${categoryId}`),
    criteria: (criteria: ProductSearchCriteria) => ({type: "UPDATE_PRODUCTS_CRITERIA", payload: criteria})
  },
  delete: {
    product: (id: number) => deleteAction("DELETE_PRODUCT", `/product/${id}`)
  },
}

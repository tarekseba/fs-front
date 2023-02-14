import { get, post, put } from "../../core"
import { StoreCreation, StoreEdition } from "../../features/Stores/table/renderStoresCellActions"
import { SearchCriteria } from "../../utils/types"
import { StoreCriteria } from "../slices/storeSlice"

export const storeActions = {
  get: {
    store: (id: number): any => get("GET_STORE", `/store/${id}`),
    stores: (searchCriteria: StoreCriteria): any => get("GET_STORES", "/store", searchCriteria),
    count: (storeId: number): any => get("GET_STORES_PROD_COUNT", `/store/${storeId}/count`)
  },
  create: {
    store: (store: StoreCreation): any => post("CREATE_STORE", "/store", store)
  },
  edit: {
    store: (storeId: number, store: StoreEdition): any => put("EDIT_STORE", `/store/${storeId}`, store),
    criteria: (criteria: StoreCriteria) => ({type: "UPDATE_STORE_CRITERIA", payload: criteria})
  }
}

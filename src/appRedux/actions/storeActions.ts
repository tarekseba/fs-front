import { get, post, put } from "../../core"
import { StoreCreation, StoreEdition } from "../../features/Stores/table/renderStoresCellActions"
import { SearchCriteria } from "../../utils/types"

export const storeActions = {
  get: {
    store: (id: number): any => get("GET_STORE", `/store/${id}`),
    stores: (): any => get("GET_STORES", "/store")
  },
  create: {
    store: (store: StoreCreation): any => post("CREATE_STORE", "/store", store)
  },
  edit: {
    store: (storeId: number, store: StoreEdition): any => put("EDIT_STORE", `/store/${storeId}`, store),
    criteria: (criteria: SearchCriteria) => ({type: "UPDATE_STORE_CRITERIA", payload: criteria})
  }
}

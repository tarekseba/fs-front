import { deleteAction, get, post, put } from "../../core"
import { CategoryEdition } from "../../features/Categories/table/modalContents/EditCategoryForm"
import { SearchCriteria } from "../../utils/types"

export const categoryActions = {
  get: {
    category: (id: number) => get("GET_CATEGORY", `/category/${id}`),
    categories: (searchCriteria: SearchCriteria) => get("GET_CATEGORIES", "/category", searchCriteria),
  },
  create: {
    category: (category: CategoryEdition) => post("CREATE_CATEGORY", "/category", category)
  },
  edit: {
    category: (categoryId: number, category: CategoryEdition) => put("EDIT_CATEGORY", `/category/${categoryId}`, category),
    criteria: (criteria: SearchCriteria) => ({type: "UPDATE_CATEGORY_CRITERIA", payload: criteria})
  },
  delete: {
    category: (categoryId: number) => deleteAction("DELETE_CATEGORY", `/category/${categoryId}`)
  }
	/* log: (msg: string) => ({type: "HELLO", payload: undefined}) */
}

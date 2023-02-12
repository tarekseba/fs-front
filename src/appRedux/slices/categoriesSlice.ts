import { ActionReducerMapBuilder, createSlice, current } from "@reduxjs/toolkit"
import { actionTypes } from "../../core"
import { ApiPaginatedSearchResult, ApiSearchResult, defaultSearchCriteria, SearchCriteria } from "../../utils/types"
import { AppPayloadAction } from "../types"
import { categoryActions } from "../actions/categoriesActions"

export interface Category {
  id: number
  name: string
  created_at: Date
}

export interface CategoryState {
  category?: Category
  categories?: ApiPaginatedSearchResult<Category>
  searchCriteria: SearchCriteria
  loading: boolean
}

const initialState: CategoryState = {
	category: undefined,
	categories: undefined,
	searchCriteria: defaultSearchCriteria,
	loading: false
}


const categorySlice = createSlice({
	name: "category",
	initialState,
	reducers: {},
	extraReducers: (builder: ActionReducerMapBuilder<CategoryState>) => {
		builder.addCase(actionTypes("GET_CATEGORY").success, (state: CategoryState, action: AppPayloadAction<ApiSearchResult<Category>>) => {
			/* action.asyncDispatch(categoryActions.log("HELLO")) */
			return { ...state }
		})
			.addCase(actionTypes("GET_CATEGORIES").success, (state: CategoryState, action: AppPayloadAction<ApiPaginatedSearchResult<Category>>) => {
				return {...state, categories: { ...action.payload }}
			})
			.addCase(actionTypes("GET_CATEGORIES").failure, (state: CategoryState, action: AppPayloadAction<ApiPaginatedSearchResult<Category>>) => {
				return {...state}
			})
      .addCase(actionTypes("CREATE_CATEGORY").success, (state: CategoryState, action: AppPayloadAction<any>) => {
        action.asyncDispatch(categoryActions.get.categories(current(state.searchCriteria)))
        return state
      })
      .addCase(actionTypes("EDIT_CATEGORY").success, (state: CategoryState, action: AppPayloadAction<any>) => {
        console.log(action.payload)
        action.asyncDispatch(categoryActions.get.categories(current(state.searchCriteria)))
        return state
      })
      .addCase(actionTypes("DELETE_CATEGORY").success, (state: CategoryState, action: AppPayloadAction<any>) => {
        console.log(current(state.searchCriteria))
        action.asyncDispatch(categoryActions.get.categories(current(state.searchCriteria)))
        return state
      })
      .addCase("UPDATE_CATEGORY_CRITERIA" as string, (state: CategoryState, action: AppPayloadAction<SearchCriteria>) => {
        action.asyncDispatch(categoryActions.get.categories({ ...action.payload }))
        return { ...state, searchCriteria: { ...action.payload } }
      })
      .addCase("RESET_CATEGORY_FIELD" as string, (state: CategoryState, action: AppPayloadAction<keyof Category>) => ({ ...state, [action.payload]: undefined })
    )
	}
})

export default categorySlice.reducer

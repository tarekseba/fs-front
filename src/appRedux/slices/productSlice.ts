import { ActionReducerMapBuilder, createSlice, current } from "@reduxjs/toolkit"
import { actionTypes } from "../../core"
import { ApiPaginatedSearchResult, ApiSearchResult, defaultSearchCriteria, SearchCriteria } from "../../utils/types"
import { productActions } from "../actions/productActions"
import { AppPayloadAction } from "../types"
import { Category } from "./categoriesSlice"

export interface ProductState {
  product?: Product
  products?: ApiPaginatedSearchResult<Product>
  searchCriteria: SearchCriteria
  is_loading: boolean
}

export interface Product {
  id: number
  store_id?: number
  name: string
  price: number
  description?: string
  categories?: Category[]
  created_at: string
}

const initialState: ProductState = {
	product: undefined,
	products: undefined,
  searchCriteria: defaultSearchCriteria,
	is_loading: false
}

const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {},
	extraReducers: (builder: ActionReducerMapBuilder<ProductState>) => {
		builder.addCase(actionTypes("GET_PRODUCT").success, (state: ProductState, action: AppPayloadAction<ApiSearchResult<Product>>) => {
			return { ...state, is_loading: false, product: action.payload.result }
		})
			.addCase(actionTypes("GET_PRODUCT").pending, (state: ProductState, action: any) => {
				return { ...state, is_loading: true }
			})
      .addCase(actionTypes("GET_PRODUCTS").success, (state: ProductState, action: AppPayloadAction<ApiPaginatedSearchResult<Product>>) => {
        return {...state, products: action.payload}
      })
      .addCase(actionTypes("GET_PRODUCTS").pending, (state: ProductState, action: any) => {
        return {...state, is_loadin: true}
      })
      .addCase(actionTypes("CREATE_PRODUCT").success, (state: ProductState, action: AppPayloadAction<any>) => {
        action.asyncDispatch(productActions.get.products(current(state.searchCriteria))) 
        return state
      })
      .addCase(actionTypes("EDIT_PRODUCT").success, (state: ProductState, action: AppPayloadAction<any>) => {
        action.asyncDispatch(productActions.get.products(current(state.searchCriteria))) 
        return state
      })
      .addCase(actionTypes("DELETE_PRODUCT").success, (state: ProductState, action: AppPayloadAction<any>) => {
        action.asyncDispatch(productActions.get.products(current(state.searchCriteria)))
        return state
      })
      .addCase(actionTypes("ATTACH_STORE").success, (state: ProductState, action: AppPayloadAction<any>) => {
        action.asyncDispatch(productActions.get.products(current(state.searchCriteria)))
        return state
      })
      .addCase(actionTypes("ATTACH_CATEGORY").success, (state: ProductState, action: AppPayloadAction<any>) => {
        action.asyncDispatch(productActions.get.products(current(state.searchCriteria)))
        return state
      })
      .addCase(actionTypes("DETTACH_CATEGORY").success, (state: ProductState, action: AppPayloadAction<any>) => {
        action.asyncDispatch(productActions.get.products(current(state.searchCriteria)))
        return state
      })
      .addCase("UPDATE_PRODUCTS_CRITERIA" as string, (state: ProductState, action: AppPayloadAction<SearchCriteria>) => {
        action.asyncDispatch(productActions.get.products({...action.payload}))
        return { ...state, searchCriteria: { ...action.payload } }
      })
	}
})

export default productSlice.reducer

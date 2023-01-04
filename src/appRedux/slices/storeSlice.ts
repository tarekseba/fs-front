import { ActionReducerMapBuilder, createSlice, current } from "@reduxjs/toolkit"
import { actionTypes } from "../../core"
import { ApiPaginatedSearchResult, ApiSearchResult, defaultSearchCriteria, SearchCriteria } from "../../utils/types"
import { storeActions } from "../actions/storeActions"
import { AppPayloadAction } from "../types"
import { Product } from "./productSlice"

export interface StoreCriteria extends SearchCriteria {
  in_holiday?: boolean
}

export interface Worktime {
  id: number,
  store_id: number,
  day_id: number,
  am_open?: string,
  am_close?: string,
  pm_open?: string,
  pm_close?: string,
}

export interface Store {
  id: number
  name: string
  products: Product[]
  is_holiday: boolean
  created_at: Date
  worktimes: Worktime[]
}

export interface StoreState {
  store?: Store
  stores?: ApiPaginatedSearchResult<Store>
  searchCriteria: StoreCriteria
  loading: boolean
}

const initialState: StoreState = {
	store: undefined,
	stores: undefined,
  searchCriteria: { ...defaultSearchCriteria, in_holiday: undefined },
	loading: false
}

const storeSlice = createSlice({
	name: "store",
	initialState,
	reducers: {},
	extraReducers: (builder: ActionReducerMapBuilder<StoreState>) => {
		builder.addCase(actionTypes("GET_STORE").success, (state: StoreState, action: AppPayloadAction<ApiSearchResult<Store>>) => {
			return { ...state, loading: false, store: action.payload.result }
		})
      .addCase(actionTypes("GET_STORES").success, (state: StoreState, action: AppPayloadAction<ApiPaginatedSearchResult<Store>>) => {
        return {...state, stores: action.payload}
      })
      .addCase(actionTypes("CREATE_STORE").success, (state: StoreState, action: AppPayloadAction<any>) => {
        action.asyncDispatch(storeActions.get.stores(current(state.searchCriteria)))
        return state
      })
      .addCase(actionTypes("EDIT_STORE").success, (state: StoreState, action: AppPayloadAction<any>) => {
        action.asyncDispatch(storeActions.get.stores(current(state.searchCriteria)))
        return state
      })
      .addCase("UPDATE_STORE_CRITERIA" as string, (state: StoreState, action: AppPayloadAction<SearchCriteria>) => {
        console.log("Update store criteria")
        action.asyncDispatch(storeActions.get.stores({ ...action.payload }))
        return { ...state, searchCriteria: { ...action.payload } }
      })
	}
})

export default storeSlice.reducer

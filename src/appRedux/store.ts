import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"
import productReducer from "./slices/productSlice"
import storeSlice from "./slices/storeSlice"
import categorySlice from "./slices/categoriesSlice"
import logger from "redux-logger"
import { asyncDispatcher } from "../utils/asyncDispatch"

export const store = configureStore({
	reducer: {
		user: userReducer,
		product: productReducer,
		store: storeSlice,
		category: categorySlice
	},
	middleware: (getDefaultMiddleware: any) =>
		getDefaultMiddleware({ serializableCheck: false })
			.concat(
				logger,
				asyncDispatcher
			),
	devTools: true
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

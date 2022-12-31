import { useMemo } from "react"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { MainActions } from "./types"
import { AppDispatch, RootState } from "./store"
import { Action, bindActionCreators, Dispatch } from "@reduxjs/toolkit"
import { mainActions } from "./actions"

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAppActions = (): MainActions => {
	const dispatch: AppDispatch = useDispatch<AppDispatch>()
	return useMemo(
		() => {
			return bindActions<MainActions>(mainActions, dispatch) as MainActions
		},
		[dispatch]
	)
}

const bindActions = <A extends MainActions>(actions: A, dispatch: Dispatch<Action>): any => {
	return Object.keys(actions)
		.reduce((acc: Record<string, any>, key: string) => {
			const actionCreator: any = actions[key as keyof MainActions]
			if (typeof actionCreator === "function") {
				acc[key] = bindActionCreators(actionCreator, dispatch)
			}
			if (typeof actionCreator === "object") {
				acc[key] = bindActions(actionCreator, dispatch)
			}
			return acc
		}, {})
}

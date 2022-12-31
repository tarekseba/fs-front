import { Action, Dispatch } from "@reduxjs/toolkit"
import { IObject } from "../utils/types"
import http, { Response } from "./http"

export interface ActionTypes {
  pending: string
  success: string
  failure: string
}

export const actionTypes = (name: string): ActionTypes => ({
	pending: `${name}_PENDING`,
	success: `${name}_SUCCEEDED`,
	failure: `${name}_FAILURE`
})

type MethodType = "get" | "put" | "post" | "delete"

const futureCreator = async <T>(method: MethodType, url: string, body: any, isFileUpload = false, queryParams?: any): Promise<Response<T>> => {
	if (method === "get") {
		return await http.get<T>(url, queryParams)
	} else {
		return await http[method]<T>(url, body, isFileUpload)
	}
}

const thunkCreator = <T>(actionName: string, method: MethodType, url: string, body: any, isFileUpload?: boolean, params?: IObject) => async (dispatch: Dispatch<Action>) => {
	dispatch({ type: actionTypes(actionName).pending, params })
	try {
		const response: Response<T> = await futureCreator<T>(method, url, body, isFileUpload, params)
		return dispatch({ type: actionTypes(actionName).success, payload: response.data, params })
	} catch (error: any) {
		return dispatch({ type: actionTypes(actionName).failure, error: error.msg })
	}
}

const get = <T>(actionName: string, url: string, params?: IObject): any => {
	return thunkCreator<T>(actionName, "get", url, null, false, params)
}

const post = <T>(actionName: string, url: string, body?: any, isFileUpload?: boolean): any => {
	return thunkCreator<T>(actionName, "post", url, body || {}, isFileUpload)
}

const put = <T>(actionName: string, url: string, body?: any, isFileUpload?: boolean): any => {
	return thunkCreator<T>(actionName, "put", url, body || {}, isFileUpload)
}

const deleteAction = <T>(actionName: string, url: string, body?: any): any => {
	return thunkCreator<T>(actionName, "delete", url, body || {})
}

export { get, post, put, deleteAction }

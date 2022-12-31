import axios, { AxiosResponse, Method } from "axios"
import { config } from "../config/config"
import { IObject } from "../utils/types"

export interface PcError {
  status?: number
  msg: string
  data?: any
}

const commonHeaders: any = {
	"Csrf-Token": "nocheck"
}

const headersDefault: any = {
	"Content-Type": "application/json",
	...commonHeaders
}

const headersFile: any = {
	enctype: "multipart/form-data",
	...commonHeaders
}

const handleError = async (error: any): Promise<any> => {
	if (error.response) {
		console.error(error.response.data)
		return await Promise.reject<PcError>({
			msg: error.response.data.error,
			status: error.response.status
		})
	} else {
		console.error(error.message)
		return await Promise.reject<PcError>({
			msg: error.message
		})
	}
}

const action = async <T>(url: string, method: Method, body: any, isFileUpload = false, queryParams?: any): Promise<Response<T>> => {
	const headers: any = isFileUpload ? headersFile : headersDefault
	return await axios({
		baseURL: config.baseUrl,
		method,
		url,
		headers,
		data: body,
		params: queryParams
	}).catch(handleError)
}

export type Response<T> = AxiosResponse<T> | PcError

// eslint-disable-next-line @typescript-eslint/typedef
const http = {
	get: async <T>(url: string, queryParams?: IObject): Promise<Response<T>> => await action<T>(url, "GET", null, false, queryParams),
	put: async <T>(url: string, data: any, isFileUpload = false): Promise<Response<T>> => await action<T>(url, "PUT", data, isFileUpload),
	post: async <T>(url: string, data: any, isFileUpload = false): Promise<Response<T>> => await action<T>(url, "POST", data, isFileUpload),
	delete: async <T>(url: string, data: any): Promise<Response<T>> => await action<T>(url, "DELETE", data)
}

export default http

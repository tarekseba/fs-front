export type OrderType = "ASC" | "DESC"

export interface ApiSearchResult<T> {
  result?: T
  error?: string
}

export interface ApiPaginatedSearchResult<T> {
  result?: T[]
  error?: string
  total_pages?: number
  page?: number,
  per_page?: number,
}

export interface SearchCriteria extends Record<string, any> {
  by?: string
  order?: OrderType
  per_page?: number
  page?: number
  name?: string
  description?: string
  in_holiday?: boolean
}

export const defaultSearchCriteria: SearchCriteria = {
	by: "id",
	order: "DESC",
	per_page: 10,
	page: 1,
  name: "",
  description: "",
  in_holiday: undefined
}

export interface IObject<T = any> { [key: string]: T }

export type ReactState<T> = [ T, ((value: (((prevState: T) => T) | T)) => void) ]

export interface AutocompleteData<T = string> {
  value?: T
  text?: string
  label: string
}


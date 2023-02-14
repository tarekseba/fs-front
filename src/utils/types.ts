export type OrderType = "ASC" | "DESC"

export interface ApiSearchResult<T> {
  rows?: T
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
}

export const defaultSearchCriteria: SearchCriteria = {
	by: "created_at",
	order: "DESC",
	per_page: 10,
	page: 1,
  name: "",
  description: "",
}

export interface IObject<T = any> { [key: string]: T }

export type ReactState<T> = [ T, ((value: (((prevState: T) => T) | T)) => void) ]

export interface AutocompleteData<T = string> {
  value?: T
  text?: string
  label: string
}

export interface Id {
  id: number
}

export const DaysOfWeek: Record<number, string> = {
  [1]: "Monday",
  [2]: "Tuesday",
  [3]: "Wednesday",
  [4]: "Thursday",
  [5]: "Friday",
  [6]: "Saturday",
  [7]: "Sunday"
}

export enum TimeOfDay {
  AM = "AM",
  PM = "PM"
}

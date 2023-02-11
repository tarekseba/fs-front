import { ReactNode } from "react"

type FieldName<T> = keyof T | string

export interface Column<T> {
  label: string,
  field_name: FieldName<T>
  can_sort: boolean
  formatter?: (row: T) => ReactNode
  i18n?: ReactState<boolean>
}

export type ReactState<T> = [ T, ((value: (((prevState: T) => T) | T)) => void) ]

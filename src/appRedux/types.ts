import { mainActions } from "./actions"

export type MainActions = typeof mainActions

export interface AppPayloadAction<P = void, C = Record<string, any>, T extends string = string, E = any> {
  payload: P
  type: T
  params: C
  error?: E
  asyncDispatch: any
}

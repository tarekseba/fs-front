import { createSlice } from "@reduxjs/toolkit"

export interface UserState {
  isConnected: boolean
  connectedUser: any
}

const initialState: UserState = {
	isConnected: false,
	connectedUser: null
}

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {}
})

export default userSlice.reducer

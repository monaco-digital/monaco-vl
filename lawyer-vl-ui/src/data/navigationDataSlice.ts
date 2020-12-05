import { createSlice } from '@reduxjs/toolkit'
import { NavView } from '../types /navigation'

export const slice = createSlice({
	name: 'navigation',
	initialState: {
		mode: 'get-started' as NavView,
	},
	reducers: {
		setMode: (state, action) => {
			state.mode = action.payload
		},
	},
})

export const { setMode } = slice.actions

export default slice.reducer

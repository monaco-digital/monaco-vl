import { createSlice } from '@reduxjs/toolkit'
import { NavView } from '../types /navigation'

export const slice = createSlice({
	name: 'navigation',
	initialState: {
		path: 'get-started' as NavView,
	},
	reducers: {
		setPage: (state, action) => {
			state.path = action.payload
		},
	},
})

export const { setPage } = slice.actions

export default slice.reducer

import { createSlice } from '@reduxjs/toolkit'
import { NavView } from './types'

export const slice = createSlice({
	name: 'navigation',
	initialState: {
		mode: 'get-started' as NavView,
	},
	reducers: {
		setMode: (state, action) => {
			console.log('set navigation', action.payload)
			state.mode = action.payload as NavView
		},
	},
})

export const { setMode } = slice.actions

export default slice.reducer

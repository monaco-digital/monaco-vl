import { createSlice } from '@reduxjs/toolkit'
import { NavView } from '../types /navigation'
import modes from '../client/state/modes'

export const slice = createSlice({
	name: 'navigation',
	initialState: {
		mode: 'GET_STARTED' as keyof typeof modes,
	},
	reducers: {
		setMode: (state, action) => {
			state.mode = action.payload
		},
	},
})

export const { setMode } = slice.actions

export default slice.reducer

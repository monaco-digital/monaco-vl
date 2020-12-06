import { createSlice } from '@reduxjs/toolkit'
import pages from '../types /navigation'

export const slice = createSlice({
	name: 'navigation',
	initialState: {
		page: pages.GET_STARTED as keyof typeof pages,
	},
	reducers: {
		setPage: (state, action) => {
			state.page = action.payload
		},
	},
})

export const { setPage } = slice.actions

export default slice.reducer

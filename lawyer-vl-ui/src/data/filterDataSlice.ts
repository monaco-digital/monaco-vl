import { createSlice } from '@reduxjs/toolkit'
import { AuthorPerspective } from './types'

export const slice = createSlice({
	name: 'filers',
	initialState: {
		authorPerspective: undefined as AuthorPerspective,
	},
	reducers: {
		setAuthorPerspective: (state, action) => {
			state.authorPerspective = action.payload
		},
	},
})

export const { setAuthorPerspective } = slice.actions

export default slice.reducer

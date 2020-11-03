import { createSlice } from '@reduxjs/toolkit'
import { Paragraph } from './types'

export const slice = createSlice({
	name: 'paragraphs',
	initialState: {
		all: [] as Paragraph[],
	},
	reducers: {
		updateAll: (state, action) => {
			state.all = action.payload
		},
	},
})

export const { updateAll } = slice.actions

export default slice.reducer

import { createSlice } from '@reduxjs/toolkit'
import { Paragraph } from './types'

export const slice = createSlice({
	name: 'paragraphs',
	initialState: {
		all: [] as Paragraph[],
		suggested: [] as Paragraph[],
		selected: [] as Paragraph[],
	},
	reducers: {
		updateAll: (state, action) => {
			state.all = action.payload
		},
		updateSuggestedParagraphs: (state, action) => {
			state.suggested = action.payload
		},
		updateSelectedParagraphs: (state, action) => {
			state.selected = action.payload
		},
	},
})

export const { updateAll, updateSelectedParagraphs } = slice.actions

export default slice.reducer

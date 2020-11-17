import { createSlice } from '@reduxjs/toolkit'
import { Paragraph } from './types'
import { getData } from '../api/vlmasersheet'

export const slice = createSlice({
	name: 'paragraphs',
	initialState: {
		all: [] as Paragraph[],
		suggested: [] as Paragraph[],
		selected: [] as Paragraph[],
	},
	reducers: {
		updateAll: (state, action) => {
			console.log('Updating reduction state with paragraphs 2223: ', action)
			state.all = action.payload
		},
		updateSuggestedParagraphs: (state, action) => {
			state.suggested = action.payload
		},
		updateSelectedParagraphs: (state, action) => {
			console.log('Updating reduction state with paragraphs 1111: ', action)
			state.selected = action.payload
		},
	},
})

export const { updateAll, updateSelectedParagraphs } = slice.actions

export default slice.reducer

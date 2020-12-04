import { createSlice } from '@reduxjs/toolkit'
import { Paragraph } from './types'
import { filterByGeneralMatch, getSuggestedParagraphs } from './../filters'

export const slice = createSlice({
	name: 'paragraphs',
	initialState: {
		all: [] as Paragraph[],
		suggested: [] as Paragraph[],
		selected: [] as Paragraph[],
	},
	reducers: {
		updateAllParagraphs: (state, action) => {
			state.all = action.payload
		},
		updateSuggestedParagraphs: (state, action) => {
			const selectedTopics = action.payload
			const suggestedParagraphs = filterByGeneralMatch(
				state.all,
				selectedTopics
			)
			state.suggested = suggestedParagraphs
		},
		updateSelectedParagraphs: (state, action) => {
			state.selected = action.payload
		},
		toggleSelectedParagraph: (state, action) => {
			const id = action.payload
			const paragraphReference = state.all.find(topic => topic.id === id)
			const isParagraphSelected = state.selected.find(topic => topic.id === id)

			if (!isParagraphSelected) {
				state.selected = [...state.selected, paragraphReference]
			} else {
				state.selected = state.selected.filter(paragraph => paragraph.id !== id)
			}
		},
		removeSelectedParagraph: (state, action) => {
			const id = action.payload

			state.selected = state.selected.filter(paragraph => paragraph.id !== id)
		},
		reorderSelectedParagraphs: (state, action) => {
			const { source, destination } = action.payload
			const { index: sourceIndex } = source
			const { index: destinationIndex } = destination
			const reorderedSelectedParagraphs = [...state.selected]
			const [removed] = reorderedSelectedParagraphs.splice(sourceIndex, 1)
			reorderedSelectedParagraphs.splice(destinationIndex, 0, removed)

			state.selected = reorderedSelectedParagraphs
		},
	},
})

export const {
	updateAllParagraphs,
	updateSuggestedParagraphs,
	updateSelectedParagraphs,
	toggleSelectedParagraph,
	removeSelectedParagraph,
	reorderSelectedParagraphs,
} = slice.actions

export default slice.reducer

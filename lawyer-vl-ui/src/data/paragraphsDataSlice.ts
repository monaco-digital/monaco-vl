import { createSlice } from '@reduxjs/toolkit'
import { Paragraph } from './types'
import { getSuggestedParagraphs } from './../filters'

export const slice = createSlice({
	name: 'paragraphs',
	initialState: {
		all: [] as Paragraph[],
		suggested: [] as Paragraph[],
		selected: [] as Paragraph[],
		cazzo: [] as Paragraph[],
	},
	reducers: {
		updateAll: (state, action) => {
			state.all = action.payload
		},
		updateSuggestedParagraphs: (state, action) => {
			const selectedTopics = action.payload
			state.suggested = getSuggestedParagraphs(state.all, selectedTopics)
		},
		updateSelectedParagraphs: (state, action) => {
			state.selected = action.payload
		},
		setParagraph: (state, action) => {
			const id = action.payload
			const paragraph = state.all.find(paragraph => paragraph.id === id)

			const isSelectedParagraph = state.selected.find(
				paragraph => paragraph.id === id
			)

			if (paragraph) {
				state.selected = [...state.selected, paragraph]
			}

			if (isSelectedParagraph) {
				state.selected = state.selected.filter(paragraph => paragraph.id !== id)
			}
		},
		deleteParagraph: (state, action) => {
			const id = action.payload

			state.selected = state.selected.filter(paragraph => paragraph.id !== id)
		},
		reorderParagraphs: (state, action) => {
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
	updateAll,
	updateSuggestedParagraphs,
	updateSelectedParagraphs,
	setParagraph,
	deleteParagraph,
	reorderParagraphs,
} = slice.actions

export default slice.reducer

import { createSlice } from '@reduxjs/toolkit'
import { Paragraph } from './types'
import { filterByGeneralMatch } from './../filters'
import { ParagraphToggle } from '../types/paragraph'

export const slice = createSlice({
	name: 'paragraphs',
	initialState: {
		all: [] as Paragraph[],
		suggested: [] as Paragraph[],
		selected: [] as Paragraph[],
		toggle: 'summary' as ParagraphToggle,
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
			console.log('updating suggested paragraphs', suggestedParagraphs)
			state.suggested = suggestedParagraphs
		},
		updateSelectedParagraphs: (state, action) => {
			state.selected = action.payload
		},
		addParagraph: (state, action) => {
			const { id, toId } = action.payload
			const paragraphReference = state.all.find(topic => topic.id === id)

			if (paragraphReference) {
				state[toId] = [...state[toId], paragraphReference]
			}
		},
		removeParagraph: (state, action) => {
			const { id, fromId } = action.payload

			state[fromId] = state[fromId].filter(paragraph => paragraph.id !== id)
		},
		toggleParagraph: (state, action) => {
			const { id, toId } = action.payload
			const paragraphReference = state.all.find(topic => topic.id === id)
			const isDuplicate = state[toId].find(topic => topic.id === id)

			if (!paragraphReference) return

			if (isDuplicate) {
				state[toId] = state[toId].filter(paragraph => paragraph.id !== id)
			} else {
				state[toId] = [...state[toId], paragraphReference]
			}
		},
		reorderParagraphs: (state, action) => {
			const { source, destination } = action.payload.dragEvent
			const fromId = source.droppableId
			const toId = destination.droppableId
			const { index: sourceIndex } = source
			const { index: destinationIndex } = destination
			const isSameList = fromId === toId

			if (isSameList) {
				const reorderedSameListParagraphs = [...state[fromId]]
				const [removed] = reorderedSameListParagraphs.splice(sourceIndex, 1)

				reorderedSameListParagraphs.splice(destinationIndex, 0, removed)
				state[fromId] = reorderedSameListParagraphs
			} else {
				const reorderedDestinationListParagraphs = [...state[toId]]
				const removed = reorderedDestinationListParagraphs.pop()

				reorderedDestinationListParagraphs.splice(destinationIndex, 0, removed)
				state[toId] = reorderedDestinationListParagraphs
			}
		},
		setParagraphToggle: (state, action) => {
			state.toggle = action.payload
		},
	},
})

export const {
	updateAllParagraphs,
	updateSuggestedParagraphs,
	updateSelectedParagraphs,
	toggleParagraph,
	addParagraph,
	removeParagraph,
	reorderParagraphs,
	setParagraphToggle,
} = slice.actions

export default slice.reducer

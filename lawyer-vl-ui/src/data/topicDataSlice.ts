import { createSlice } from '@reduxjs/toolkit'
import { CaseTopic } from './types'

export const slice = createSlice({
	name: 'topic',
	initialState: {
		all: [] as CaseTopic[],
		selected: [] as CaseTopic[],
	},
	reducers: {
		setAllTopics: (state, action) => {
			state.all = action.payload
		},
		setTopics: (state, action) => {
			state.selected = action.payload
			console.log('the selected topics are: ', state.selected)
		},
		unselectTopic: (state, action) => {
			const id = action.payload
			state.selected = state.selected.filter(topic => topic.id !== id)
		},
		toggleTopic: (state, action) => {
			const id = action.payload
			const topicReference = state.all.find(topic => topic.id === id)
			const isTopicSelected = state.selected.find(topic => topic.id === id)

			if (!topicReference) {
				// Topic not defined, do nothing
			} else if (!isTopicSelected) {
				state.selected = [...state.selected, topicReference]
			} else {
				state.selected = state.selected.filter(topic => topic.id !== id)
			}
		},
	},
})

export const {
	setTopics,
	toggleTopic,
	unselectTopic,
	setAllTopics,
} = slice.actions

export default slice.reducer

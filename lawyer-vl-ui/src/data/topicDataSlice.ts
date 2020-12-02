import { createSlice } from '@reduxjs/toolkit'
import { CaseTopic } from './types'
import { Topics } from '../data/types'

export const slice = createSlice({
	name: 'topic',
	initialState: {
		selected: [] as CaseTopic[],
	},
	reducers: {
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
			const topicReference = Topics.find(topic => topic.id === id)
			const isTopicSelected = state.selected.find(topic => topic.id === id)

			if (!isTopicSelected) {
				state.selected = [...state.selected, topicReference]
			} else {
				state.selected = state.selected.filter(topic => topic.id !== id)
			}
		},
	},
})

export const { setTopics, toggleTopic, unselectTopic } = slice.actions

export default slice.reducer

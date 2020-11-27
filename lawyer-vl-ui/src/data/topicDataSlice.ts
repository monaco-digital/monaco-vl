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
		},
		setTopicsRadio: (state, action) => {
			console.log('setTopicsRadio')
			const { options, id } = action.payload
			const optionsIds = options.map(option => option.id)
			const topicReference = Topics.find(topic => topic.id === id)
			const filteredTopicsRadio = state.selected.filter(
				topic => !optionsIds.includes(topic.id)
			)
			// Empty selections as is a radio input
			state.selected = filteredTopicsRadio
			state.selected = [...state.selected, topicReference]
		},
		setTopicsMulti: (state, action) => {
			const { id } = action.payload
			const topicReference = Topics.find(topic => topic.id === id)
			const isTopicSelected = state.selected.find(topic => topic.id === id)

			switch (true) {
				case !!topicReference:
					state.selected = [...state.selected, topicReference]
					break
				case !!isTopicSelected:
					state.selected = state.selected.filter(topic => topic.id !== id)
					break
			}
		},
	},
})

export const { setTopics, setTopicsRadio, setTopicsMulti } = slice.actions

export default slice.reducer

import { createSlice } from '@reduxjs/toolkit'
import { ViewLogic } from '../clustering'
import modes from '../client/state/modes'

export const slice = createSlice({
	name: 'question',
	initialState: {
		screen: 0,
		mode: null,
		prevState: {} as any,
		currentQuestion: {},
		answeredQuestions: [],
	},
	reducers: {
		addAnsweredQuestion: (state, action) => {
			const latestQuestion = action.payload
			state.answeredQuestions.push(latestQuestion)
		},
		setCurrentQuestion: (state, action) => {
			state.currentQuestion = action.payload
		},
	},
})

export const { addAnsweredQuestion, setCurrentQuestion } = slice.actions

export default slice.reducer

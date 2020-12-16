import { createSlice } from '@reduxjs/toolkit'
import { getFirstQuestion } from '../clustering/questionFlow'

export const slice = createSlice({
	name: 'question',
	initialState: {
		screen: 0,
		mode: null,
		prevState: {} as any,
		currentQuestion: getFirstQuestion(),
		answeredQuestions: [],
	},
	reducers: {
		addAnsweredQuestion: (state, action) => {
			const latestQuestion = action.payload
			state.answeredQuestions.push(latestQuestion)
		},
		removeLastAnsweredQuestion: (state, action) => {
			const lastAnswered = state.answeredQuestions.pop()
		},
		setCurrentQuestion: (state, action) => {
			state.currentQuestion = action.payload
		},
	},
})

export const {
	addAnsweredQuestion,
	removeLastAnsweredQuestion,
	setCurrentQuestion,
} = slice.actions

export default slice.reducer

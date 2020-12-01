import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ViewLogic, View } from '../clustering'
import modes from '../apps/MobileApp/state/modes'

export const slice = createSlice({
	name: 'question',
	initialState: {
		screen: 0,
		mode: null,
		prevState: {} as any,
		currentQuestion: {},
	},
	reducers: {
		setView: (state, action) => {
			const selectedTopics = action.payload
			const view = new ViewLogic()
			const currentScreen = {
				screen: state.screen,
				options: selectedTopics,
			}
			const nextCurrentQuestion = view.getNextView(currentScreen)
			const isFirstScreen = !state.screen
			const isLastQuestion = !nextCurrentQuestion.hasOwnProperty('screen')

			if (isFirstScreen) {
				state.mode = modes.TOPICS
			}

			if (isLastQuestion) {
				state.mode = modes.PARAGRAPHS_PREVIEW
			}

			state.prevState = { ...state }
			state.screen = nextCurrentQuestion.screen
			state.currentQuestion = nextCurrentQuestion
		},
		setMode: (state, action) => {
			const mode = action.payload

			state.mode = mode
		},
	},
})

export const { setView, setMode } = slice.actions

export default slice.reducer

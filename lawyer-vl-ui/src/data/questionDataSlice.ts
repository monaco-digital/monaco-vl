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
			const currentQuestion = view.getNextView(currentScreen)
			const isFirstScreen = !state.screen

			if (isFirstScreen) {
				state.prevState = { ...state }
				state.screen = currentQuestion.screen
				state.currentQuestion = currentQuestion
				state.mode = modes.TOPICS
			}
		},
	},
})

export const { setView } = slice.actions

export default slice.reducer

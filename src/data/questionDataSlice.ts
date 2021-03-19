/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getFirstQuestion } from '../clustering/questionFlow';

export const slice = createSlice({
	name: 'question',
	initialState: {
		currentQuestion: getFirstQuestion(),
	},
	reducers: {
		setCurrentQuestion: (state, action) => {
			state.currentQuestion = action.payload;
		},
	},
});

export const { setCurrentQuestion } = slice.actions;

export default slice.reducer;

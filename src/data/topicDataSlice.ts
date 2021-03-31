/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { CaseTopic } from 'api/vl/models';

export const slice = createSlice({
	name: 'topic',
	initialState: {
		all: [] as CaseTopic[],
	},
	reducers: {
		setAllTopics: (state, action) => {
			state.all = action.payload;
		},
	},
});

export const { setAllTopics } = slice.actions;

export default slice.reducer;

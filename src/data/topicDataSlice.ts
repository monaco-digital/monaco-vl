import { createSlice } from '@reduxjs/toolkit';
import { CaseTopic } from '@monaco-digital/vl-types/lib/main';

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

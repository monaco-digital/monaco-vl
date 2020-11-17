import { createSlice } from '@reduxjs/toolkit'
import { Topic } from './types'

export const slice = createSlice({
	name: 'paragraphs',
	initialState: {
		selected: [] as Topic[],
	},
	reducers: {
		setTopics: (state, action) => {
			state.selected = action.payload
		},
	},
})

export const { setTopics } = slice.actions

export default slice.reducer

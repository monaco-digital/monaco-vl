import { createSlice } from '@reduxjs/toolkit'
import { Paragraph } from './types'

type userField = {
	id: string
}

type selectedUserField = userField & {
	visible: boolean
}

export const slice = createSlice({
	name: 'user-fields',
	initialState: {
		active: null,
		userFields: [] as userField[],
	},
	reducers: {
		addUserField: (state, action) => {
			const userFields = action.payload
			console.log({ userFields })

			state.userFields = [...state.userFields, userFields]
		},
		setActiveParagraphComponent: (state, action) => {
			const paragraph = action.payload as Paragraph
			state.active = paragraph
		},
	},
})

export const { addUserField, setActiveParagraphComponent } = slice.actions

export default slice.reducer

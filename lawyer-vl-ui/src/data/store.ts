import { configureStore } from '@reduxjs/toolkit'
import paragraphReducer from './paragraphsDataSlice'
import userFieldsReducer from './userFieldsSlice'
import topicsReducer from './topicDataSlice'
import questionsReducer from './questionDataSlice'
import navigationReducer from './navigationDataSlice'

export default configureStore({
	reducer: {
		paragraphs: paragraphReducer,
		userFields: userFieldsReducer,
		topics: topicsReducer,
		questions: questionsReducer,
		navigation: navigationReducer,
	},
})

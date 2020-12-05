import { configureStore } from '@reduxjs/toolkit'
import paragraphReducer from './paragraphsDataSlice'
import topicsReducer from './topicDataSlice'
import questionsReducer from './questionDataSlice'
import navigationReducer from './navigationDataSlice'

export default configureStore({
	reducer: {
		paragraphs: paragraphReducer,
		topics: topicsReducer,
		questions: questionsReducer,
		navigation: navigationReducer,
	},
})

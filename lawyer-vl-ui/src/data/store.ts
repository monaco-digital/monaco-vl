import { configureStore } from '@reduxjs/toolkit'
import paragraphReducer from './paragraphsDataSlice'
import topicsReducer from './topicDataSlice'
import questionsReducer from './questionDataSlice'

export default configureStore({
	reducer: {
		paragraphs: paragraphReducer,
		topics: topicsReducer,
		questions: questionsReducer,
	},
})

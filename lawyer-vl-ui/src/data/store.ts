import { configureStore } from '@reduxjs/toolkit'
import paragraphReducer from './paragraphsDataSlice'
import topicsReducer from './topicDataSlice'
import questionsReducer from './questionDataSlice'
import navigationReducer from './navigationDataSlice'
import filterReducer from './filterDataSlice'

export default configureStore({
	reducer: {
		paragraphs: paragraphReducer,
		topics: topicsReducer,
		questions: questionsReducer,
		navigation: navigationReducer,
		filters: filterReducer,
	},
})

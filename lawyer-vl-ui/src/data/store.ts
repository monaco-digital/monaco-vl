import { configureStore } from '@reduxjs/toolkit'
import paragraphReducer from './paragraphsDataSlice'
import topicsReducer from './topicDataSlice'

export default configureStore({
	reducer: {
		paragraphs: paragraphReducer,
		topics: topicsReducer,
	},
})

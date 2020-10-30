import { configureStore } from '@reduxjs/toolkit'
import paragraphReducer from './paragraphsDataSlice'

export default configureStore({
	reducer: {
		paragraphs: paragraphReducer,
	},
})

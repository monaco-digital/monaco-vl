import { configureStore } from '@reduxjs/toolkit';
import topicsReducer from './topicDataSlice';
import sessionReducer from './sessionDataSlice';
import featureReducer from './featureDataSlice';

export default configureStore({
	reducer: {
		topics: topicsReducer,
		session: sessionReducer,
		features: featureReducer,
	},
});

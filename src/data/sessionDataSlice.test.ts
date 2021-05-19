import { configureStore } from '@reduxjs/toolkit';
import sessionReducer, { addAnsweredQuestion, updateNarrative, updateSelectedTopics } from './sessionDataSlice';
import { cdfValues } from '../client/components/common/UserData/CDF1';
import AppState from './AppState';

describe('Session Data Slice', () => {
	let store;
	beforeEach(() => {
		store = configureStore({
			reducer: {
				session: sessionReducer,
			},
		});
	});

	test('Calling update narrative reducer correctly updates state', () => {
		let state = store.getState().session;
		expect(state.narrative).toBeFalsy();

		const mockNarrative = 'This is a test narrative';
		store.dispatch(updateNarrative(mockNarrative));

		state = store.getState().session;
		expect(state?.narrative).toEqual(mockNarrative);
		expect(state.userData.description).toEqual(mockNarrative);
	});

	test('For employed calling add answered correctly  updates the store', () => {
		store.dispatch(updateSelectedTopics([{ id: 'E' }]));
		let state = store.getState().session;
		expect(state.userData.stillEmployed).toBeFalsy();

		store.dispatch(addAnsweredQuestion(1));

		state = store.getState().session;

		expect(state.userData.stillEmployed).toEqual(cdfValues.stillEmployed.YES);
	});

	test('For not employed calling add answered correctly updates the store', () => {
		store.dispatch(updateSelectedTopics([{ id: '_NE' }]));
		let state = store.getState().session;
		expect(state.userData.stillEmployed).toBeFalsy();

		store.dispatch(addAnsweredQuestion(1));

		state = store.getState().session;

		expect(state.userData.stillEmployed).toEqual(cdfValues.stillEmployed.NO);
	});

	test('For more than two years employed add answered correctly  updates the store', () => {
		store.dispatch(updateSelectedTopics([{ id: 'M2y' }]));
		let state = store.getState().session;
		expect(state.userData.yearsEmployed).toBeFalsy();

		store.dispatch(addAnsweredQuestion(3));

		state = store.getState().session;

		expect(state.userData.yearsEmployed).toEqual(cdfValues.yearsEmployed.MORE_THAN_2);
	});

	test('For less than two years employed add answered correctly  updates the store', () => {
		store.dispatch(updateSelectedTopics([{ id: '2y' }]));
		let state = store.getState().session;
		expect(state.userData.yearsEmployed).toBeFalsy();

		store.dispatch(addAnsweredQuestion(3));

		state = store.getState().session;

		expect(state.userData.yearsEmployed).toEqual(cdfValues.yearsEmployed.LESS_THAN_2);
	});

	test('Given 3 answered questions When Reanswering first question Then Later questions are no longer answered', () => {
		store.dispatch(addAnsweredQuestion(1));
		store.dispatch(addAnsweredQuestion(2));
		store.dispatch(addAnsweredQuestion(3));

		let state = store.getState().session as AppState['session'];
		expect(state.answeredQuestions).toEqual([1, 2, 3]);

		store.dispatch(addAnsweredQuestion(1));

		state = store.getState().session as AppState['session'];
		expect(state.answeredQuestions).toEqual([1]);
	});
});

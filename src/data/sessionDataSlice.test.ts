import store from './store';
import {
	addAnsweredQuestion,
	removeLastAnsweredQuestion,
	updateNarrative,
	updateSelectedTopics,
	updateUserData,
} from './sessionDataSlice';
import { cdfValues } from '../client/components/common/UserData/CDF1';

describe('Session Data Slice', () => {
	beforeEach(() => {
		store.dispatch(updateSelectedTopics([]));
		store.dispatch(updateUserData({}));
		store.dispatch(updateSelectedTopics(undefined));
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

	test('For employed calling add answered correctly and removing last answered question updates the store', () => {
		store.dispatch(updateSelectedTopics([{ id: 'E' }]));
		let state = store.getState().session;
		expect(state.userData.stillEmployed).toBeFalsy();

		store.dispatch(addAnsweredQuestion({ id: 1 }));

		state = store.getState().session;

		expect(state.userData.stillEmployed).toEqual(cdfValues.stillEmployed.YES);

		store.dispatch(updateSelectedTopics([]));
		store.dispatch(removeLastAnsweredQuestion());

		state = store.getState().session;
		expect(state.userData.stillEmployed).toBeFalsy();
	});

	test('For not employed calling add answered correctly and removing last answered question updates the store', () => {
		store.dispatch(updateSelectedTopics([{ id: '_NE' }]));
		let state = store.getState().session;
		expect(state.userData.stillEmployed).toBeFalsy();

		store.dispatch(addAnsweredQuestion({ id: 1 }));

		state = store.getState().session;

		expect(state.userData.stillEmployed).toEqual(cdfValues.stillEmployed.NO);

		store.dispatch(updateSelectedTopics([]));
		store.dispatch(removeLastAnsweredQuestion());

		state = store.getState().session;
		expect(state.userData.stillEmployed).toBeFalsy();
	});

	test('For more than two years employed add answered correctly and removing last answered question updates the store', () => {
		store.dispatch(updateSelectedTopics([{ id: 'M2y' }]));
		let state = store.getState().session;
		expect(state.userData.yearsEmployed).toBeFalsy();

		store.dispatch(addAnsweredQuestion({ id: 3 }));

		state = store.getState().session;

		expect(state.userData.yearsEmployed).toEqual(cdfValues.yearsEmployed.MORE_THAN_2);

		store.dispatch(updateSelectedTopics([]));
		store.dispatch(removeLastAnsweredQuestion());

		state = store.getState().session;
		expect(state.userData.yearsEmployed).toBeFalsy();
	});

	test('For less than two years employed add answered correctly and removing last answered question updates the store', () => {
		store.dispatch(updateSelectedTopics([{ id: '2y' }]));
		let state = store.getState().session;
		expect(state.userData.yearsEmployed).toBeFalsy();

		store.dispatch(addAnsweredQuestion({ id: 3 }));

		state = store.getState().session;

		expect(state.userData.yearsEmployed).toEqual(cdfValues.yearsEmployed.LESS_THAN_2);

		store.dispatch(updateSelectedTopics([]));
		store.dispatch(removeLastAnsweredQuestion());

		state = store.getState().session;
		expect(state.userData.yearsEmployed).toBeFalsy();
	});
});

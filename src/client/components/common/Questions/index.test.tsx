import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';

import Questions from './index';
import { renderWithProviders } from '../../../../testing/utils.test';
import {
	addAnsweredQuestion,
	removeLastAnsweredQuestion,
	updateSelectedTopics,
} from '../../../../data/sessionDataSlice';

jest.mock('../Question', () => () => {
	return 'Question';
});

describe('Questions Page', () => {
	let initialState;

	beforeEach(() => {
		initialState = {
			questions: {
				currentQuestion: {
					id: 1,
					prerequisites: [],
					text: 'Are you still employed?',
					subtext: 'Choose one:',
					minAnswers: 1,
					maxAnswers: 1,
					isFinal: false,
					options: [
						{
							text: 'Still employed',
							topicId: 'E',
						},
						{
							text: 'No longer employed',
							topicId: '_NE',
						},
					],
				},
			},
			session: {
				suggestedParagraphs: [],
				selectedTopics: [],
				answeredQuestions: [],
				selectedTemplate: null,
				sessionDocuments: null,
				userData: {},
			},
			features: {
				enableMonetization: false,
			},
		};
	});

	test('When Loading Questions Then Page renders', () => {
		renderWithProviders(<Questions />, { initialState });
	});

	test('When clicking back Then store is updated', () => {
		const { store } = renderWithProviders(<Questions />, { initialState, startPage: '/questions' });

		userEvent.click(screen.getByText('Back'));

		const actions = store.getActions();
		expect(actions[0]).toEqual(updateSelectedTopics([]));
		expect(actions[1]).toEqual(removeLastAnsweredQuestion());
	});

	test('Given Topic is selected When clicking next Then current question is answered', () => {
		initialState.session.selectedTopics = [
			{
				__typename: 'CaseTopic',
				_id: '5fd371e905c337242f65f4e1',
				id: 'E',
				type: 'employment_situation',
				topic: null,
				name: 'EMPLOYED',
				text: 'Employed',
				parentTopics: null,
				subTopics: null,
				meta: null,
			},
		];
		const { store } = renderWithProviders(<Questions />, { initialState, startPage: '/questions' });

		userEvent.click(screen.getByText('Next'));

		const actions = store.getActions();
		expect(actions[0]).toEqual(addAnsweredQuestion(initialState.questions.currentQuestion));
	});
});

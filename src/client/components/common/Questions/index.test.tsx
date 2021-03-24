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

describe('Help Page', () => {
	let initialState;

	beforeEach(() => {
		initialState = {
			questions: {
				currentQuestion: {
					id: 1,
					prerequisites: [],
					text: 'What would you like?',
					subtext: 'Choose one:',
					minAnswers: 1,
					maxAnswers: 1,
					isFinal: false,
					options: [
						{
							text: 'Get advice',
							topicId: '_ADV',
						},
						{
							text: 'Respond to a legal letter',
							topicId: '_RES',
						},
						{
							text: 'Write a legal letter',
							topicId: '_LET',
						},
					],
				},
			},
			session: {
				suggestedParagraphs: [],
				selectedTopics: [],
				answeredQuestions: [],
				selectedTemplate: null,
				sessionDocument: null,
				userData: {},
			},
			features: {
				enableMonetization: false,
			},
		};
	});

	test('When Loading Help Then Page renders', () => {
		renderWithProviders(<Questions />, { initialState });
	});

	test('When clicking back Then store is updated', () => {
		const { store } = renderWithProviders(<Questions />, { initialState, startPage: '/questions' });

		userEvent.click(screen.getByText('Back'));

		const actions = store.getActions();
		expect(actions[0]).toEqual(updateSelectedTopics([]));
		expect(actions[1]).toEqual(removeLastAnsweredQuestion());
	});

	test('When clicking help Then help page is opened', () => {
		const { history } = renderWithProviders(<Questions />, { initialState, startPage: '/questions' });

		userEvent.click(screen.getByAltText('More Info'));

		expect(history.location.pathname).toEqual('/help');
	});

	test('Given Topic is selected When clicking next Then current question is answered', () => {
		initialState.session.selectedTopics = [
			{
				__typename: 'CaseTopic',
				_id: '602d8e7760a2b3f79704893d',
				id: '_LET',
				type: 'case',
				topic: null,
				name: 'WRITE_LETTER',
				text: 'Write letter',
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

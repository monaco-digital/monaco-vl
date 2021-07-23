import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { Route, Switch } from 'react-router-dom';

import Questions from './index';
import { renderWithProviders } from '../../../../testing/utils.test';
import { addAnsweredQuestion } from '../../../../data/sessionDataSlice';

jest.mock('../Question', () => () => {
	return 'Question';
});

jest.mock('../ScrollToTopOnMount', () => () => {
	return 'ScrollToTopOnMount';
});

jest.mock('../../../../api/vl/graphql');

describe('Questions Page', () => {
	let initialState;

	beforeEach(() => {
		initialState = {
			session: {
				suggestedParagraphs: [],
				selectedTopics: [],
				answeredQuestions: [],
				selectedTemplate: null,
				sessionDocuments: null,
				userData: {},
			},
			features: {
				enableNarrative: false,
				academyFlow: false
			},
		};
	});

	test('When Loading Questions Then Page renders', () => {
		renderWithProviders(
			<Switch>
				<Route path="/questions/:id">
					<Questions />
				</Route>
			</Switch>,
			{ initialState, startPage: '/questions/1' },
		);
	});

	test('When clicking back Then the previous page is loaded', () => {
		const { history } = renderWithProviders(
			<Switch>
				<Route path="/questions/:id">
					<Questions />
				</Route>
			</Switch>,
			{ initialState, startPage: '/get-started' },
		);

		history.push('/questions/1');

		userEvent.click(screen.getAllByText('Back')[0]);

		expect(history.location.pathname).toEqual('/get-started');
	});

	test('Given Topic is selected When clicking next Then current question is answered and next question is loaded', () => {
		initialState.session.selectedTopics = [
			{
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
		const { store, history } = renderWithProviders(
			<Switch>
				<Route path="/questions/:id">
					<Questions />
				</Route>
			</Switch>,
			{ initialState, startPage: '/questions/1' },
		);

		const nextButton = screen.getAllByRole('button', {
			name: /next/i,
		})[0];

		userEvent.click(nextButton);

		const actions = store.getActions();
		expect(actions[0]).toEqual(addAnsweredQuestion(1));
		expect(history.location.pathname).toEqual('/questions/3');
	});

	test('Given Last Question is loaded When clicking next Then question is answered and statements are loaded', () => {
		initialState.session.selectedTopics = [
			{
				id: 'E',
				type: 'employment_situation',
				topic: null,
				name: 'EMPLOYED',
				text: 'Employed',
				parentTopics: null,
				subTopics: null,
			},
			{
				id: 'M2y',
				type: 'employment_situation',
				topic: null,
				name: 'MORE_THAN_2_YEARS',
				text: 'More than 2 years',
				parentTopics: null,
				subTopics: null,
			},
			{
				id: '_NCE',
				type: 'employment_situation',
				topic: null,
				name: 'HAVENT_COMPLAINED',
				text: "Haven't complained",
				parentTopics: null,
				subTopics: null,
			},
		];
		initialState.session.answeredQuestions = [1, 3, 6, 7];
		const { history, store } = renderWithProviders(
			<Switch>
				<Route path="/questions/:id">
					<Questions />
				</Route>
			</Switch>,
			{ initialState, startPage: '/questions/8' },
		);

		const nextButton = screen.getAllByRole('button', {
			name: /next/i,
		})[0];

		userEvent.click(nextButton);

		const actions = store.getActions();
		expect(actions[0]).toEqual(addAnsweredQuestion(8));

		expect(history.location.pathname).toEqual('/statements');
	});

	test('Given previously answered question is loaded When clicking next Then next question is loaded', () => {
		initialState.session.selectedTopics = [
			{
				id: 'E',
				type: 'employment_situation',
				topic: null,
				name: 'EMPLOYED',
				text: 'Employed',
				parentTopics: null,
				subTopics: null,
			},
			{
				id: 'M2y',
				type: 'employment_situation',
				topic: null,
				name: 'MORE_THAN_2_YEARS',
				text: 'More than 2 years',
				parentTopics: null,
				subTopics: null,
			},
			{
				id: '_NCE',
				type: 'employment_situation',
				topic: null,
				name: 'HAVENT_COMPLAINED',
				text: "Haven't complained",
				parentTopics: null,
				subTopics: null,
			},
		];
		initialState.session.answeredQuestions = [1, 3, 6, 7];
		const { history, store } = renderWithProviders(
			<Switch>
				<Route path="/questions/:id">
					<Questions />
				</Route>
			</Switch>,
			{ initialState, startPage: '/questions/3' },
		);

		const nextButton = screen.getAllByRole('button', {
			name: /next/i,
		})[0];

		userEvent.click(nextButton);
		const actions = store.getActions();
		expect(actions[0]).toEqual(addAnsweredQuestion(3));

		expect(history.location.pathname).toEqual('/questions/6');
	});
});

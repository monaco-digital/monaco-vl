import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Question from './index';
import { renderWithProviders } from '../../../../testing/utils.test';

describe('Question Page', () => {
	let initialState;

	const currentQuestion = {
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
	};

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
			},
			topics: {
				all: [
					{
						id: 'E',
						name: 'EMPLOYED',
						parentTopics: null,
						subTopics: null,
						text: 'Employed',
						topic: null,
						type: 'employment_situation',
						__typename: 'CaseTopic',
					},
				],
			},
		};
	});

	test('When loading Question Then component renders', () => {
		renderWithProviders(<Question question={currentQuestion} />, { initialState });
	});

	test('When loading Question Then option text is on the screen', () => {
		renderWithProviders(<Question question={currentQuestion} />, { initialState });

		expect(screen.getByText('Still employed')).toBeInTheDocument();
		expect(screen.getByText('No longer employed')).toBeInTheDocument();
	});

	test('When selecting an option Then updateSelectedTopics is called', () => {
		const { store } = renderWithProviders(<Question question={currentQuestion} />, { initialState });

		const checkbox = screen.getAllByRole('checkbox')[0];

		userEvent.click(checkbox);

		const actions = store.getActions();

		expect(actions[0].type).toEqual('session/updateSelectedTopics');
		expect(actions[0].payload).toEqual(initialState.topics.all);
	});
});

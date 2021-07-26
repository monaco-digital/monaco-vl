import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';

import AllQuestions from '.';
import { allQuestions as listOfQuestions } from '../../../../clustering/questionFlow';
import { renderWithProviders } from '../../../../testing/utils.test';

jest.mock('../ScrollToTopOnMount', () => () => {
	return 'ScrollToTopOnMount';
});

describe('AllQuestions Page', () => {
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
			topics: {
				all: [],
			},
			features: {
				enableNarrative: false,
				academyFlow: true,
			},
		};
	});

	test('When loading AllQuestions Then Page renders', () => {
		renderWithProviders(<AllQuestions />, { initialState });

		expect(screen.getByText('Are you still employed?')).toBeInTheDocument();
	});

	test('When loading AllQuestions Then All questions are displayed', () => {
		renderWithProviders(<AllQuestions />, { initialState });

		listOfQuestions.forEach(question => {
			expect(screen.getAllByText(question.text)[0]).toBeInTheDocument();
			if (question.subtext.length > 0) {
				expect(screen.getAllByText(question.subtext)[0]).toBeInTheDocument();
			}
		});
	});

	test('When loading AllQuestions Then Next button is enabled', () => {
		renderWithProviders(<AllQuestions />, { initialState });
		const nextButton = screen.getAllByRole('button', {
			name: /next/i,
		})[0];

		expect(nextButton).toBeEnabled();
	});

	test('When clicking next Then Narrative page is loaded', () => {
		const { history } = renderWithProviders(<AllQuestions />, { initialState });

		userEvent.click(screen.getAllByText('Next')[0]);

		expect(history.location.pathname).toEqual('/narrative');
	});
});

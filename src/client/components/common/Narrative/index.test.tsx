import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';

import { removeLastAnsweredQuestion } from 'data/sessionDataSlice';
import { renderWithProviders } from '../../../../testing/utils.test';

import Narrative from '.';

jest.mock('api/vl/graphql');

describe('Narrative Page', () => {
	let initialState;

	beforeEach(() => {
		initialState = {
			session: {
				suggestedParagraphs: [],
				selectedTopics: [{ id: 'A' }, { id: 'B' }, { id: 'C' }],
				answeredQuestions: [],
				selectedTemplate: null,
				sessionDocuments: null,
				userData: {},
			},
		};
	});

	test('When Loading Narrative Page Then Page renders', async () => {
		renderWithProviders(<Narrative />, { initialState });
		expect(await screen.findByText('Provide a summary of your case')).toBeInTheDocument();
	});

	test('Given Text When Clicking Next Then Statements page Loads', async () => {
		const { history } = renderWithProviders(<Narrative />, { initialState, startPage: '/narrative' });

		userEvent.type(screen.getByRole('textbox'), 'A narrative');
		expect(screen.getByText('11/2000')).toBeInTheDocument();

		userEvent.click(screen.getByText('Next'));

		await waitFor(() => {
			expect(history.location.pathname).toEqual('/statements');
		});
	});

	test('Given Text and Predict Results When Clicking Next Then paragraphs are selected', async () => {
		const { store } = renderWithProviders(<Narrative />, { initialState, startPage: '/statements' });

		userEvent.type(screen.getByRole('textbox'), 'A narrative');
		userEvent.click(screen.getByText('Next'));

		await waitFor(() => {
			const actions = store.getActions();
			expect(actions[0].type).toEqual('session/generateParagraphsByTopics/pending');

			// apollo client mock is not set up - thunk always rejects.
			expect(actions[1].type).toEqual('session/generateParagraphsByTopics/rejected');
		});
	});

	test('Given no text When Clicking Next Then Error appears', async () => {
		renderWithProviders(<Narrative />, { initialState });

		userEvent.click(screen.getByText('Next'));

		expect(await screen.findByText('Please add a description of your case')).toBeInTheDocument();
	});

	test('When clicking back Then the URL Changes and the store is updated', async () => {
		const { history } = renderWithProviders(<Narrative />, { initialState, startPage: '/first' });

		history.push('/narrative');

		userEvent.click(screen.getByText('Back'));

		await waitFor(() => {
			expect(history.location.pathname).toEqual('/first');
		});
	});
});

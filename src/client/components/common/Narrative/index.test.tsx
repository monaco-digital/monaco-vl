import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';

import { removeLastAnsweredQuestion } from 'data/sessionDataSlice';
import { renderWithProviders } from '../../../../testing/utils.test';
import { getSuggestedParagraphs } from '../../../../api/vl';
import Narrative from '.';

jest.mock('../../../../api/vl');

describe('Statement Page', () => {
	let initialState;

	beforeEach(() => {
		initialState = {
			session: {
				suggestedParagraphs: [
					{
						templateComponent: {
							id: 'QPM0NVJAgfHe9UkDGLSer-PAR1',
							type: 'Paragraph',
							paragraph: {
								id: 'QPM0NVJAgfHe9UkDGLSer-PAR1',
								summary: 'I was dismissed',
								verticalHeight: 1,
								topic: '() + allOf(T) + !(_GR)',
								status: 'Live',
								topicsOneOf: [],
								topicsAllOf: ['T'],
								topicsNoneOf: ['_GR'],
								paragraphComponents: [
									{
										id: 'QPM0NVJAgfHe9UkDGLSer-STXT-0',
										type: 'StaticText',
										textFirstPerson: 'I refer to my recent dismissal.',
										textThirdPerson:
											'We have been instructed by the above-named client in respect of their recent dismissal.',
									},
								],
							},
						},
						isSelected: false,
					},
				],
				selectedTopics: [],
				answeredQuestions: [],
				selectedTemplate: null,
				sessionDocument: null,
				userData: {},
			},
		};

		const mock = getSuggestedParagraphs as jest.Mock<any, any>;

		mock.mockReturnValue([]);
	});

	test('When Loading Narrative Page Then Page renders', async () => {
		renderWithProviders(<Narrative />, { initialState });
		expect(await screen.findByText('Provide a summary of your case')).toBeInTheDocument();
	});

	test('When Clicking Help Then Help Page Loads', () => {
		const { history } = renderWithProviders(<Narrative />, { initialState, startPage: '/statements' });

		userEvent.click(screen.getByAltText('More Info'));

		expect(history.location.pathname).toEqual('/help');
	});

	test('Given Text When Clicking Help Then Preview page Loads', async () => {
		const { history } = renderWithProviders(<Narrative />, { initialState, startPage: '/statements' });

		userEvent.type(screen.getByRole('textbox'), 'A narrative');
		expect(screen.getByText('11/2000')).toBeInTheDocument();

		userEvent.click(screen.getByText('Preview Letter'));

		await waitFor(() => {
			expect(history.location.pathname).toEqual('/preview');
		});
	});

	test('Given no text When Clicking Submit Then Error appears', async () => {
		renderWithProviders(<Narrative />, { initialState });

		userEvent.click(screen.getByText('Preview Letter'));

		expect(await screen.findByText('Please add a description of your case')).toBeInTheDocument();
	});

	test('When clicking back Then the URL Changes and the store is updated', async () => {
		const { store, history } = renderWithProviders(<Narrative />, { initialState, startPage: '/statements' });

		userEvent.click(screen.getByText('Back'));

		await waitFor(() => {
			expect(history.location.pathname).toEqual('/questions');
		});

		const actions = store.getActions();
		expect(actions[0]).toEqual(removeLastAnsweredQuestion());
	});
});

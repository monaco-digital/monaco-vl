import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';

import { removeLastAnsweredQuestion, selectParagraphs } from 'data/sessionDataSlice';
import { predictParagraphsFromParagraphs } from 'api/ds';
import { renderWithProviders } from '../../../../testing/utils.test';
import { getSuggestedParagraphs } from '../../../../api/vl';

import Narrative from '.';

jest.mock('../../../../api/vl');
jest.mock('api/ds');

describe('Narrative Page', () => {
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
				sessionDocuments: null,
				userData: {},
			},
		};
		const predictMock = predictParagraphsFromParagraphs as jest.Mock<any, any>;
		predictMock.mockReturnValue([]);

		const suggestedMock = getSuggestedParagraphs as jest.Mock<any, any>;
		suggestedMock.mockReturnValue([]);
	});

	test('When Loading Narrative Page Then Page renders', async () => {
		renderWithProviders(<Narrative />, { initialState });
		expect(await screen.findByText('Provide a summary of your case')).toBeInTheDocument();
	});

	test('Given Text When Clicking Preview Then Preview page Loads', async () => {
		const { history } = renderWithProviders(<Narrative />, { initialState, startPage: '/statements' });

		userEvent.type(screen.getByRole('textbox'), 'A narrative');
		expect(screen.getByText('11/2000')).toBeInTheDocument();

		userEvent.click(screen.getByText('Preview Letter'));

		await waitFor(() => {
			expect(history.location.pathname).toEqual('/preview');
		});
	});

	test('Given Text and Predict Results When Clicking Preview Then paragraphs are selected', async () => {
		const predictMock = predictParagraphsFromParagraphs as jest.Mock<any, any>;

		predictMock.mockReturnValue(['1', '2', '3']);

		const { store } = renderWithProviders(<Narrative />, { initialState, startPage: '/statements' });

		userEvent.type(screen.getByRole('textbox'), 'A narrative');
		userEvent.click(screen.getByText('Preview Letter'));

		await waitFor(() => {
			const actions = store.getActions();
			expect(actions[1]).toEqual(selectParagraphs(['1', '2', '3']));
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

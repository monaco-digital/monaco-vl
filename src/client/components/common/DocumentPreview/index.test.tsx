import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { Route, Switch } from 'react-router-dom';

import { renderWithProviders } from '../../../../testing/utils.test';
import { createSessionDocument } from '../../../../utils/sessionDocument';

import DocumentPreview from './index';

jest.mock('../VLcard', () => () => {
	return 'VLcard';
});

jest.mock('../ScrollToTopOnMount', () => () => {
	return 'ScrollToTopOnMount';
});

jest.mock('../../../../utils/sessionDocument');

describe('Document Preview', () => {
	let initialState;

	beforeEach(() => {
		initialState = {
			session: {
				suggestedParagraphs: [
					{
						templateComponent: {
							id: 'szzK5MMl-UtXkEQ9QsBkA',
							type: 'Paragraph',
							version: 1,
							paragraph: {
								id: 'szzK5MMl-UtXkEQ9QsBkA',
								summary: "My contract states the pay I'm entitled to",
								verticalHeight: 2,
								topic: '() + allOf(M) + !()',
								status: 'Live',
								topicsOneOf: [],
								topicsAllOf: ['M'],
								topicsNoneOf: [],
								types: ['_WP'],
								isAutomaticallyIncluded: false,
								paragraphComponents: [
									{
										id: 'szzK5MMl-UtXkEQ9QsBkA-STXT-0',
										type: 'StaticText',
										textFirstPerson:
											"My contract of employment provides that I'm paid £ [insert £ amount] by way of [insert].",
									},
								],
							},
						},
						documentComponent: null,
						isSelected: false,
					},
					{
						templateComponent: {
							id: 'tQDFmkjGyPvpZtDjxGf42',
							type: 'Paragraph',
							version: 1,
							paragraph: {
								id: 'tQDFmkjGyPvpZtDjxGf42',
								summary: "Payments became due but weren't paid. I didn't agree to the deduction and want it rectified",
								verticalHeight: 3,
								topic: '() + allOf(M) + !()',
								status: 'Live',
								topicsOneOf: [],
								topicsAllOf: ['M'],
								topicsNoneOf: [],
								types: ['_WP'],
								isAutomaticallyIncluded: false,
								paragraphComponents: [
									{
										id: 'tQDFmkjGyPvpZtDjxGf42-STXT-0',
										type: 'StaticText',
										textFirstPerson:
											"The following payments became due and weren't paid: [list sums and dates here]. I didn't agree to this deduction and therefore it's unlawful. Please rectify it.",
									},
								],
							},
						},
						documentComponent: null,
						isSelected: false,
					},
					{
						templateComponent: {
							id: 'Hm5tFY7Xq1s34yvTxzr7Q',
							type: 'Paragraph',
							version: 1,
							paragraph: {
								id: 'Hm5tFY7Xq1s34yvTxzr7Q',
								summary: "If the employer doesn't pay me what is owed, I'll bring a claim",
								verticalHeight: 4,
								topic: '() + allOf(M) + !(_GR, _ET)',
								status: 'Live',
								topicsOneOf: [],
								topicsAllOf: ['M'],
								topicsNoneOf: ['_GR', '_ET'],
								types: ['_WP'],
								isAutomaticallyIncluded: false,
								paragraphComponents: [
									{
										id: 'Hm5tFY7Xq1s34yvTxzr7Q-STXT-0',
										type: 'StaticText',
										textFirstPerson:
											"If this unlawful deduction isn't rectified, I intend to present a claim for the difference between what you paid and what I was owed.",
									},
								],
							},
						},
						documentComponent: null,
						isSelected: true,
					},
					{
						templateComponent: {
							id: 'fSKjwnSIvD4MJHXZt4tsA',
							type: 'Paragraph',
							version: 1,
							paragraph: {
								id: 'fSKjwnSIvD4MJHXZt4tsA',
								summary: 'I am considering whether to resign',
								verticalHeight: 25,
								topic: '() + allOf(E) + !(_GR,_ET)',
								status: 'Live',
								topicsOneOf: [],
								topicsAllOf: ['E'],
								topicsNoneOf: ['_GR', '_ET'],
								types: ['_WP'],
								isAutomaticallyIncluded: true,
								paragraphComponents: [
									{
										id: 'fSKjwnSIvD4MJHXZt4tsA-STXT-0',
										type: 'StaticText',
										textFirstPerson:
											'Your treatment of me amounts to a fundamental breach of our employment contract, so I could resign and claim constructive dismissal. However, I have not yet decided whether to resign.',
									},
								],
							},
						},
						documentComponent: null,
						isSelected: true,
					},
				],
				selectedTopics: [],
				answeredQuestions: [],
				selectedTemplate: null,
				sessionDocuments: {},
				userData: {},
			},
			features: {
				isDsFlow: false,
			},
		};
	});

	test('When Loading Preview Then Page renders', () => {
		renderWithProviders(<DocumentPreview />, { initialState });
	});

	test('When clicking back Then page is updated', () => {
		const { history } = renderWithProviders(<DocumentPreview />, { initialState, startPage: '/statements' });
		history.push('/preview/_WP');
		userEvent.click(screen.getAllByText('Back')[0]);

		expect(history.location.pathname).toEqual('/statements');
	});

	test('When clicking Email Then next page is shown', () => {
		const { history } = renderWithProviders(<DocumentPreview />, { initialState, startPage: '/preview/_WP' });

		userEvent.click(screen.getAllByText('Next')[0]);

		expect(history.location.pathname).toEqual('/progress-legal-case');
	});

	test('When Loading WP Preview Then WP Document Created with selected paras', () => {
		renderWithProviders(<DocumentPreview />, { initialState, startPage: '/preview/_WP' });

		expect(createSessionDocument).toHaveBeenCalledTimes(1);
		expect(createSessionDocument).toHaveBeenCalledWith(
			expect.objectContaining({}),
			expect.arrayContaining([
				expect.objectContaining({
					templateComponent: expect.objectContaining({ id: 'Hm5tFY7Xq1s34yvTxzr7Q' }),
				}),

				expect.objectContaining({
					templateComponent: expect.objectContaining({ id: 'fSKjwnSIvD4MJHXZt4tsA' }),
				}),
			]),
		);

		expect(createSessionDocument).not.toHaveBeenCalledWith(
			expect.objectContaining({}),
			expect.arrayContaining([
				expect.objectContaining({
					templateComponent: expect.objectContaining({ id: 'szzK5MMl-UtXkEQ9QsBkA' }),
				}),
			]),
		);
		expect(createSessionDocument).not.toHaveBeenCalledWith(
			expect.objectContaining({}),
			expect.arrayContaining([
				expect.objectContaining({
					templateComponent: expect.objectContaining({ id: 'tQDFmkjGyPvpZtDjxGf42' }),
				}),
			]),
		);
	});

	test('When Loading ET Preview Then None of _ET paragraphs are not included', () => {
		renderWithProviders(
			<Switch>
				<Route path="/preview/:id">
					<DocumentPreview />
				</Route>
			</Switch>,
			{ initialState, startPage: '/preview/_ET' },
		);

		expect(createSessionDocument).toHaveBeenCalledTimes(1);

		expect(createSessionDocument).not.toHaveBeenCalledWith(
			expect.objectContaining({}),
			expect.arrayContaining([
				expect.objectContaining({
					templateComponent: expect.objectContaining({ id: 'Hm5tFY7Xq1s34yvTxzr7Q' }),
				}),
			]),
		);
		expect(createSessionDocument).not.toHaveBeenCalledWith(
			expect.objectContaining({}),
			expect.arrayContaining([
				expect.objectContaining({
					templateComponent: expect.objectContaining({ id: 'fSKjwnSIvD4MJHXZt4tsA' }),
				}),
			]),
		);
	});
});

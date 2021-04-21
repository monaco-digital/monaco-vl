import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithProviders } from '../../../../testing/utils.test';
import {} from '../../../../data/sessionDataSlice';
import StatementSelect from '.';
import { getSuggestedParagraphs } from '../../../../api/vl';

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
				sessionDocuments: null,
				userData: {},
			},
		};

		const mock = getSuggestedParagraphs as jest.Mock<any, any>;

		mock.mockReturnValue([]);
	});

	test('When Loading Statement Page Then Page renders', () => {
		renderWithProviders(<StatementSelect />, { initialState });
	});

	test('When Loading Statement Page Then Statement is visible', async () => {
		renderWithProviders(<StatementSelect />, { initialState });

		expect(await screen.findByText('I was dismissed')).toBeInTheDocument();
	});

	test('Given multiple suggested paragraph When Loading Statement Page Then multiple statements visible', async () => {
		initialState.session.suggestedParagraphs.push({
			templateComponent: {
				id: '2',
				type: 'Paragraph',
				paragraph: {
					id: '2',
					summary: 'Another Paragraph',
					verticalHeight: 1,
					topic: '() + allOf(T) + !(_GR)',
					status: 'Live',
					topicsOneOf: [],
					topicsAllOf: ['T'],
					topicsNoneOf: ['_GR'],
					isAutomaticallyIncluded: false,
					paragraphComponents: [
						{
							id: '',
							type: 'StaticText',
							textFirstPerson: 'Another Paragraph',
						},
					],
				},
			},
			isSelected: true,
		});
		renderWithProviders(<StatementSelect />, { initialState });

		expect(await screen.findByText('I was dismissed')).toBeInTheDocument();
		expect(await screen.findByText('Another Paragraph')).toBeInTheDocument();
	});

	test('Given autoInclude paragraph When Loading Statement Page Then Statement is not visible', async () => {
		initialState.session.suggestedParagraphs.push({
			templateComponent: {
				id: '2',
				type: 'Paragraph',
				paragraph: {
					id: '2',
					summary: 'This is AutoIncluded',
					verticalHeight: 1,
					topic: '() + allOf(T) + !(_GR)',
					status: 'Live',
					topicsOneOf: [],
					topicsAllOf: ['T'],
					topicsNoneOf: ['_GR'],
					isAutomaticallyIncluded: true,
					paragraphComponents: [
						{
							id: '',
							type: 'StaticText',
							textFirstPerson: 'This is AutoIncluded',
							textThirdPerson:
								'We have been instructed by the above-named client in respect of their recent dismissal.',
						},
					],
				},
			},
			isSelected: true,
		});
		renderWithProviders(<StatementSelect />, { initialState });

		expect(screen.queryByText('This is AutoIncluded')).not.toBeInTheDocument();
	});
});

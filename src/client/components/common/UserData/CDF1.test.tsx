import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';

import { CDF1 } from './CDF1';
import { renderWithProviders } from '../../../../testing/utils.test';
import { submitDetails } from '../../../../api/general';

jest.mock('../../../../api/general');

describe('CDF1 Page', () => {
	let initialState;

	beforeEach(() => {
		initialState = {
			session: {
				suggestedParagraphs: [],
				selectedTopics: [],
				answeredQuestions: [],
				selectedTemplate: null,
				sessionDocuments: null,
				userData: {
					adviceText: 'Advice Text',
					letterText: 'Letter Text',
					topicsList: 'D,RR',
					name: 'First Last',
					recipient: 'email@email.com',
				},
			},
		};

		const mock = submitDetails as jest.Mock<any, any>;

		mock.mockReturnValue(Promise.resolve());
	});

	test('When Loading CDF1 Then Page renders', () => {
		renderWithProviders(<CDF1 />, { initialState });
	});

	test('Given No fields filled out When Clicking Submit Then Errors Appear', async () => {
		renderWithProviders(<CDF1 />, { initialState });

		userEvent.click(screen.getByText('Request Callback'));

		await waitFor(() => {
			expect(screen.getByText('Description is required')).toBeInTheDocument();
			expect(screen.getByText('Job Title is required')).toBeInTheDocument();
			expect(screen.getByText('Phone is required')).toBeInTheDocument();
			expect(screen.getByText('Years employed is required')).toBeInTheDocument();
			expect(screen.getByText('This is a required field')).toBeInTheDocument();
			expect(screen.getByText('Salary is required')).toBeInTheDocument();
		});
	});

	test('Given all fields filled out When Clicking Submit Then fields submitted to API', async () => {
		const { history } = renderWithProviders(<CDF1 />, { initialState });

		userEvent.type(screen.getByTestId('description').querySelector('textarea'), 'Description Text');
		userEvent.type(screen.getByTestId('jobTitle').querySelector('input'), 'A job');
		userEvent.type(screen.getByTestId('phone').querySelector('input'), '123456789');

		userEvent.selectOptions(screen.getByLabelText('Still employed *'), 'Yes');
		userEvent.selectOptions(screen.getByLabelText('Years Employed *'), 'Less than 2 years');
		userEvent.selectOptions(screen.getByLabelText('Salary *'), '£0 - £30,000');
		userEvent.selectOptions(screen.getByLabelText('Do you have a settlement agreement ? *'), 'Yes');

		userEvent.click(screen.getByText('Request Callback'));

		await waitFor(() => {
			expect(submitDetails).toHaveBeenCalledWith({
				adviceText: 'Advice Text',
				letterText: 'Letter Text',
				topicsList: 'D,RR',
				name: 'First Last',
				recipient: 'email@email.com',
				description: 'Description Text',
				phone: '123456789',
				salary: '£0 - £30,000',
				'settlement-agreement': 'Yes',
				'still-employed': 'Yes',
				'years-employed': 'Less than 2 years',
			});

			expect(history.location.pathname).toEqual('/preview/checkout/cdf1/complete');
		});
	});
});

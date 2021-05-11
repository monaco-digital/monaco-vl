import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import EmploymentTribuanlExplanation from '.';
import { renderWithProviders } from '../../../../testing/utils.test';

describe('Grievance Letter Explanation', () => {
	test('Click back and get in the progress legal case page', () => {
		const { history } = renderWithProviders(<EmploymentTribuanlExplanation />, { startPage: '/progress-legal-case' });
		history.push('/employment-tribunal-explanation');
		userEvent.click(screen.getByText('Back'));
		expect(history.location.pathname).toEqual('/progress-legal-case');
	});

	test('Click next and get in preview letter', () => {
		const { history } = renderWithProviders(<EmploymentTribuanlExplanation />, {
			startPage: '/employment-tribunal-explanation',
		});
		userEvent.click(screen.getByText('Next'));

		expect(history.location.pathname).toEqual('/preview/_ET');
	});
});

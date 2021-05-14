import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GrievanceLetterExplanation from '.';
import { renderWithProviders } from '../../../../testing/utils.test';

describe('Grievance Letter Explanation', () => {
	test('Click back and get in the progress legal case page', () => {
		const { history } = renderWithProviders(<GrievanceLetterExplanation />, { startPage: '/progress-legal-case' });
		history.push('/grievance-explanation');
		userEvent.click(screen.getByText('Back'));
		expect(history.location.pathname).toEqual('/progress-legal-case');
	});

	test('Click next and get in preview letter', () => {
		const { history } = renderWithProviders(<GrievanceLetterExplanation />, { startPage: '/grievance-explanation' });
		userEvent.click(screen.getByText('Next'));

		expect(history.location.pathname).toEqual('/preview/_GR');
	});
});

import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';

import { Settlement } from '.';
import { renderWithProviders } from '../../../../testing/utils.test';

describe('Settlement Page', () => {
	test('When loading Settlement Then Page renders', () => {
		renderWithProviders(<Settlement />);
		expect(screen.getByText('Reach Settlement')).toBeInTheDocument();
	});

	test('When loading Settlement Then back and next buttons are enabled', () => {
		renderWithProviders(<Settlement />);

		const backButton = screen.getByRole('button', {
			name: /back/i,
		});
		const nextButton = screen.getByRole('button', {
			name: /next/i,
		});
		expect(backButton).toBeEnabled();
		expect(nextButton).toBeEnabled();
	});

	// TODO - insert test for back button

	test('When clicking next The CDF Form Opens', () => {
		const { history } = renderWithProviders(<Settlement />);
		userEvent.click(screen.getByText('Next'));
		expect(history.location.pathname).toEqual('/preview/checkout/cdf1');
	});
});

import React, { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Settlement } from '.';
import { renderWithProviders } from '../../../../testing/utils.test';

describe('Settlement Page', () => {
	test('When loading Settlement Then Page renders', () => {
		renderWithProviders(<Settlement />);
		expect(screen.getByText('Agree settlement')).toBeInTheDocument();
	});

	// test('When loading Settlement Then back and next buttons are enabled', () => {
	// 	renderWithProviders(<Settlement />);

	// 	const backButton = screen.getAllByRole('button', {
	// 		name: /back/i,
	// 	})[0];
	// 	const nextButton = screen.getAllByRole('button', {
	// 		name: /next/i,
	// 	})[0];
	// 	expect(backButton).toBeEnabled();
	// 	expect(nextButton).toBeEnabled();
	// });

	// test('When clicking back Then previous page is loaded', () => {
	// 	const { history } = renderWithProviders(<Settlement />, { startPage: '/preview/_RES_CO' });
	// 	history.push('/step/settlement');
	// 	userEvent.click(screen.getAllByText('Back')[0]);

	// 	expect(history.location.pathname).toEqual('/preview/_RES_CO');
	// });
});

import React, { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Header from '.';
import { renderWithProviders } from '../../../../testing/utils.test';

describe('Header Component', () => {
	test('When loading Header Then component renders', () => {
		renderWithProviders(<Header />);

		expect(screen.getByTestId('header-component')).toBeInTheDocument();
	});

	test('When clicking Request Callback the CDF form opens', () => {
		const { history } = renderWithProviders(<Header />);
		userEvent.click(screen.getByText('Request callback'));
		expect(history.location.pathname).toEqual('/cdf/form');
	});

	test('When clicking Help the Help page opens', () => {
		const { history } = renderWithProviders(<Header />);
		userEvent.click(screen.getByText('Help'));
		expect(history.location.pathname).toEqual('/help');
	});

	test('When clicking Terms of Use the Terms page opens', () => {
		const { history } = renderWithProviders(<Header />);
		userEvent.click(screen.getByText('Terms of Use'));
		expect(history.location.pathname).toEqual('/terms');
	});
});

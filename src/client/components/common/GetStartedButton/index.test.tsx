import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import GetStartedButton from '.';
import { renderWithProviders } from '../../../../testing/utils.test';

describe('Get Started Button', () => {
	test('When loading GetStartedButton Then component renders', () => {
		renderWithProviders(<GetStartedButton />);

		expect(screen.getByText('Get Started')).toBeInTheDocument();
	});

	test('When clicking next Then Questions page is loaded', () => {
		const { history } = renderWithProviders(<GetStartedButton />);

		userEvent.click(screen.getByText('Get Started'));

		expect(history.location.pathname).toEqual('/questions');
	});
});

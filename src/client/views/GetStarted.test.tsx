import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';

import GetStarted from './GetStarted';
import { renderWithProviders } from '../../testing/utils.test';

describe('Help Page', () => {
	test('When Loading GetStarted Then Page renders', () => {
		renderWithProviders(<GetStarted />);

		expect(screen.getByText('Empowering employees')).toBeInTheDocument();
	});

	test('When clicking find out more Then help page loaded', () => {
		const { history } = renderWithProviders(<GetStarted />);

		userEvent.click(screen.getByText('Find out more'));

		expect(window.location.pathname).toEqual('/Help');
	});
});

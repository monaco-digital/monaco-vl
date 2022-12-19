import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';

import Help from './Help';
import { renderWithProviders } from '../../testing/utils.test';

jest.mock('../components/common/ScrollToTopOnMount', () => () => {
	return 'ScrollToTopOnMount';
});

describe('Help Page', () => {
	test('When Loading Help Then Page renders', () => {
		renderWithProviders(<Help />, { startPage: '/help' });

		expect(screen.getByText('Virtual Lawyer help')).toBeInTheDocument();
	});

	test('When clicking back Then previous page loaded', () => {
		const { history } = renderWithProviders(<Help />, { startPage: '/oldpage' });

		history.push('/help');
		userEvent.click(screen.getAllByText('Back')[0]);

		expect(history.location.pathname).toEqual('/oldpage');
	});
});

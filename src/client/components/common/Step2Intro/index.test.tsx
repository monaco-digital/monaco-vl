import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';

import Step2Intro from '.';
import { renderWithProviders } from '../../../../testing/utils.test';

describe('Step 2 Intro Page', () => {
	test('When loading Step2IntroPage Then Page renders', () => {
		renderWithProviders(<Step2Intro />);

		expect(screen.getByText('Write letter')).toBeInTheDocument();
	});

	test('When loading Step2Intro Then back and next buttons are enabled', () => {
		renderWithProviders(<Step2Intro />);

		const backButton = screen.getAllByRole('button', {
			name: /back/i,
		})[0];
		const nextButton = screen.getAllByRole('button', {
			name: /next/i,
		})[0];

		expect(backButton).toBeEnabled();
		expect(nextButton).toBeEnabled();
	});

	test('When clicking back Then advice is generated', () => {
		const { history } = renderWithProviders(<Step2Intro />, { startPage: '/preview/_ADV' });
		history.push('/start-legal-process');
		userEvent.click(screen.getAllByText('Back')[0]);

		expect(history.location.pathname).toEqual('/preview/_ADV');
	});

	test('When clicking next Then WP letter is generated', () => {
		const { history } = renderWithProviders(<Step2Intro />);

		userEvent.click(screen.getAllByText('Next')[0]);

		expect(history.location.pathname).toEqual('/preview/_WP');
	});
});

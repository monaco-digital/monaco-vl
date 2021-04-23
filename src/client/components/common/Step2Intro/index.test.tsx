import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';

import Step2Intro from '.';
import { renderWithProviders } from '../../../../testing/utils.test';

describe('Step 2 Intro Page', () => {
	test('When loading Step2IntroPage Then Page renders', () => {
		renderWithProviders(<Step2Intro />);

		expect(screen.getByText('Start legal letter process')).toBeInTheDocument();
	});

	test('When loading Step2Intro Then back and next buttons are enabled', () => {
		renderWithProviders(<Step2Intro />);

		const backButton = screen.getByRole('button', {
			name: /back/i,
		});
		const nextButton = screen.getByRole('button', {
			name: /next/i,
		});

		expect(backButton).toBeEnabled();
		expect(nextButton).toBeEnabled();
	});

	test('When clicking back Then advice is generated', () => {
		const { history } = renderWithProviders(<Step2Intro />);

		userEvent.click(screen.getByText('Back'));

		expect(history.location.pathname).toEqual('/preview/_ADV');
	});

	test('When clicking next Then WP letter is generated', () => {
		const { history } = renderWithProviders(<Step2Intro />);

		userEvent.click(screen.getByText('Next'));

		expect(history.location.pathname).toEqual('/preview/_WP');
	});
});

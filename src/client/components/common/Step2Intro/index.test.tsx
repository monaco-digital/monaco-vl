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

		const backButton = document.getElementById('backButton');
		const nextButton = document.getElementById('nextButton');

		expect(backButton).toBeEnabled();
		expect(nextButton).toBeEnabled();
	});

	test('When clicking next Then WP letter is generated', () => {
		const { history } = renderWithProviders(<Step2Intro />);

		userEvent.click(screen.getByText('Next'));

		expect(history.location.pathname).toEqual('/preview/_WP');
	});
});

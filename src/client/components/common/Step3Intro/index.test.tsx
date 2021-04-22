import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';

import Step3Intro from '.';
import { renderWithProviders } from '../../../../testing/utils.test';

describe('Step 3 Intro Page', () => {
	const options = [
		{ text: 'My employer has replied to my letter', optionId: '0' },
		{ text: 'My employer is ignoring me', optionId: '1' },
		{ text: 'My 3 month time limit is running out', optionId: '2' },
	];

	const getIds = () => {
		const ids = [];
		options.forEach(option => {
			ids.push(option.optionId);
		});
		return ids;
	};

	test('When loading Step3IntroPage Then Page renders', () => {
		renderWithProviders(<Step3Intro />);

		expect(screen.getByText('Progress legal case')).toBeInTheDocument();
	});

	test('When loading Step3IntroPage ensure each option appears', () => {
		renderWithProviders(<Step3Intro />);

		options.forEach(option => {
			expect(screen.getByText(option.text)).toBeInTheDocument();
		});
	});

	test('When selecting an option Then checkbox is checked', () => {
		renderWithProviders(<Step3Intro />);

		const ids = getIds();

		options.forEach(option => {
			userEvent.click(screen.getByText(option.text));
			const currentId = option.optionId;
			expect(document.getElementById(option.optionId)).toBeChecked();
			// Check that other checkboxes are not checked, as only one can be selected at a time
			ids.forEach(id => {
				if (id !== currentId) {
					expect(document.getElementById(id)).not.toBeChecked();
				}
			});
		});
	});

	test('When loading Step3Intro Then next button is disabled', () => {
		const component = renderWithProviders(<Step3Intro />);

		const button = document.getElementById('nextButton');

		expect(button).toBeDisabled();
	});

	test('When selecting an option Then next button is enabled', () => {
		renderWithProviders(<Step3Intro />);
		const button = document.getElementById('nextButton');

		options.forEach(option => {
			userEvent.click(screen.getByText(option.text));
			expect(button).toBeEnabled();
		});
	});

	test('When selecting second option Then grievance letter is generated', () => {
		const { history } = renderWithProviders(<Step3Intro />);

		userEvent.click(screen.getByText(options[1].text)); // Select second option
		userEvent.click(screen.getByText('Next')); // Click next button

		expect(history.location.pathname).toEqual('/preview/_GR');
	});
});

import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';

import RespondToEmployer from '.';
import { renderWithProviders } from '../../../../testing/utils.test';

describe('Step 3 Intro Page', () => {
	const options = [
		{ text: '(i) My employer is denying everything', optionId: '_RES_CD' },
		{ text: '(ii) My employer has made a settlement offer', optionId: '_RES_CO' },
		{ text: '(iii) My employer says they are investigating', optionId: '_RES_I' },
		{ text: "(iv) My employer said they don't want me to leave", optionId: '_RES_KM' },
	];

	test('When loading RespondToEmployer Then Page renders', () => {
		renderWithProviders(<RespondToEmployer />);
		expect(
			screen.getByText('You now have 4 template letters to choose from depending on what your employer is saying:'),
		).toBeInTheDocument();
	});

	test('When loading RespondToEmployer Then each option appears', () => {
		renderWithProviders(<RespondToEmployer />);
		options.forEach(option => {
			expect(screen.getByText(option.text)).toBeInTheDocument();
		});
	});

	test('When selecting an option Then checkbox is checked', () => {
		renderWithProviders(<RespondToEmployer />);

		const texts = options.map(option => option.text);

		options.forEach(option => {
			userEvent.click(screen.getByText(option.text));
			const currentText = option.text;
			expect(screen.getByLabelText(option.text)).toBeChecked();
			// Check that other checkboxes are not checked, as only one can be selected at a time
			texts.forEach(text => {
				if (text !== currentText) {
					expect(screen.getByLabelText(text)).not.toBeChecked();
				}
			});
		});
	});

	test('When loading RespondToEmployer Then next button is disabled', () => {
		renderWithProviders(<RespondToEmployer />);
		const button = screen.getByRole('button', {
			name: /next/i,
		});
		expect(button).toBeDisabled();
	});

	test('When selecting an option Then next button is enabled', () => {
		renderWithProviders(<RespondToEmployer />);
		const button = screen.getByRole('button', {
			name: /next/i,
		});

		options.forEach(option => {
			userEvent.click(screen.getByText(option.text));
			expect(button).toBeEnabled();
		});
	});

	test('When selecting first option Then CD letter is generated', () => {
		const { history } = renderWithProviders(<RespondToEmployer />);

		userEvent.click(screen.getByText(options[0].text)); // Select first option
		userEvent.click(screen.getByText('Next')); // Click next button

		expect(history.location.pathname).toEqual('/preview/_RES_CD');
	});

	test('When selecting second option Then CO letter is generated', () => {
		const { history } = renderWithProviders(<RespondToEmployer />);

		userEvent.click(screen.getByText(options[1].text)); // Select second option
		userEvent.click(screen.getByText('Next')); // Click next button

		expect(history.location.pathname).toEqual('/preview/_RES_CO');
	});

	test('When selecting third option Then I letter is generated', () => {
		const { history } = renderWithProviders(<RespondToEmployer />);

		userEvent.click(screen.getByText(options[2].text)); // Select third option
		userEvent.click(screen.getByText('Next')); // Click next button

		expect(history.location.pathname).toEqual('/preview/_RES_I');
	});

	test('When selecting fourth option Then KM letter is generated', () => {
		const { history } = renderWithProviders(<RespondToEmployer />);

		userEvent.click(screen.getByText(options[3].text)); // Select fourth option
		userEvent.click(screen.getByText('Next')); // Click next button

		expect(history.location.pathname).toEqual('/preview/_RES_KM');
	});

	test('When clicking back Then previous page is loaded', () => {
		const { history } = renderWithProviders(<RespondToEmployer />, { startPage: '/progress-legal-case' });
		history.push('/respond-to-employer');
		userEvent.click(screen.getByText('Back'));

		expect(history.location.pathname).toEqual('/progress-legal-case');
	});
});

import React, { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ActionBar from '.';
import { renderWithProviders } from '../../../../testing/utils.test';

describe('EndToEndStepper Component', () => {
	const mockNextHandler = jest.fn();

	test('When loading EndToEndStepper Then component renders', () => {
		renderWithProviders(<ActionBar step={0} nextHandler={mockNextHandler} />);
	});

	test('When showBackButton is false Then only one back button shows', () => {
		renderWithProviders(<ActionBar step={0} nextHandler={mockNextHandler} showBackButton={false} />);

		const backButton = screen.getAllByText('Back');

		expect(backButton.length).toBe(1);
	});

	test('Both back buttons show by default', () => {
		renderWithProviders(<ActionBar step={0} nextHandler={mockNextHandler} />);

		const backButton = screen.getAllByText('Back');

		expect(backButton).not.toBeUndefined();
		expect(backButton.length).toBe(2);
	});

	test('When next is clicked Then the next handler is called', () => {
		renderWithProviders(<ActionBar step={0} nextHandler={mockNextHandler} />);

		const nextButton = screen.getAllByText('Next');

		expect(nextButton).not.toBeUndefined();

		userEvent.click(nextButton[0]);
		expect(mockNextHandler).toHaveBeenCalledTimes(1);
	});

	test('When nextDisabled is true Then both next buttons are disabled', () => {
		renderWithProviders(<ActionBar step={0} nextHandler={mockNextHandler} nextDisabled />);

		const nextButtons = screen.getAllByRole('button', {
			name: /next/i,
		});

		expect(nextButtons.length).toBe(2);
		expect(nextButtons[0]).toBeDisabled();
		expect(nextButtons[1]).toBeDisabled();
	});

	test('Both next buttons are enabled by default', () => {
		renderWithProviders(<ActionBar step={0} nextHandler={mockNextHandler} />);

		const nextButtons = screen.getAllByRole('button', {
			name: /next/i,
		});

		expect(nextButtons.length).toBe(2);
		expect(nextButtons[0]).toBeEnabled();
		expect(nextButtons[1]).toBeEnabled();
	});
});

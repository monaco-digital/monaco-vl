import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';

import OptionAccordion from '.';
import { renderWithProviders } from '../../../../testing/utils.test';

const mockFunction = jest.fn();

describe('OptionAccordion Page', () => {
	test('When loading OptionAccordion Then gage renders', () => {
		renderWithProviders(<OptionAccordion labelText="Option 1" id="1" onClickHandler={mockFunction} isChecked />);
	});

	test('When loading OptionAccordion Then option text is on the screen', () => {
		const text = 'Option 1';
		renderWithProviders(<OptionAccordion labelText={text} id="1" onClickHandler={mockFunction} isChecked />);

		expect(screen.getByText('Option 1')).toBeInTheDocument();
	});

	test('When isChecked is true Then checkbox is checked', () => {
		renderWithProviders(<OptionAccordion labelText="Option 1" id="1" onClickHandler={mockFunction} isChecked />);

		const checkbox = screen.getByRole('checkbox');

		expect(checkbox).toBeChecked();
	});

	test('When isChecked is false Then checkbox is not checked', () => {
		renderWithProviders(
			<OptionAccordion labelText="Option 1" id="1" onClickHandler={mockFunction} isChecked={false} />,
		);

		const checkbox = screen.getByRole('checkbox');

		expect(checkbox).not.toBeChecked();
	});

	test('When selecting checkbox Then callback function is called', () => {
		const id = '1';
		renderWithProviders(<OptionAccordion labelText="Option 1" id={id} onClickHandler={mockFunction} isChecked />);

		const checkbox = screen.getByRole('checkbox');

		userEvent.click(checkbox);

		expect(mockFunction).toHaveBeenCalledTimes(1);
		expect(mockFunction).toHaveBeenCalledWith(id);
	});

	test('When selecting text Then callback function is called', () => {
		const text = 'Option 1';
		const id = '1';
		renderWithProviders(<OptionAccordion labelText={text} id={id} onClickHandler={mockFunction} isChecked />);

		userEvent.click(screen.getByText(text));

		expect(mockFunction).toHaveBeenCalledTimes(1);
		expect(mockFunction).toHaveBeenCalledWith(id);
	});
});

import React, { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CDFComplete from './CDFComplete';
import { renderWithProviders } from '../../../../testing/utils.test';

describe('Header Component', () => {
	test('When loading Header Then component renders', () => {
		renderWithProviders(<CDFComplete />);

		expect(screen.getByText('Thank You')).toBeInTheDocument();
	});

	test('When isFinalStep is True then Done button does not show', () => {
		renderWithProviders(<CDFComplete />);
		const doneButton = screen.queryByText('Done');
		expect(doneButton).not.toBeInTheDocument();
	});

	test('When isFinalStep is False then Done button shows', () => {
		renderWithProviders(<CDFComplete isFinalStep={false} />);
		const doneButton = screen.queryByText('Done');
		expect(doneButton).toBeInTheDocument();
	});
});

import React, { screen } from '@testing-library/react';

import CDFComplete from './CDFComplete';
import { renderWithProviders } from '../../../../testing/utils.test';

jest.mock('../ScrollToTopOnMount', () => () => {
	return 'ScrollToTopOnMount';
});

describe('Header Component', () => {
	test('When loading Header Then component renders', () => {
		renderWithProviders(<CDFComplete />);

		expect(screen.getByText('Thank You')).toBeInTheDocument();
	});

	test('When isFinalStep is True then Done button does not show', () => {
		renderWithProviders(<CDFComplete isFinalStep />);
		const doneButton = screen.queryByText('Done');
		expect(doneButton).not.toBeInTheDocument();
	});

	test('When isFinalStep is False then Done button shows', () => {
		renderWithProviders(<CDFComplete />);
		const doneButton = screen.queryByText('Done');
		expect(doneButton).toBeInTheDocument();
	});
});

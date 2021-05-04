import { screen } from '@testing-library/react';

import EndToEndStepper from '.';
import { renderWithProviders } from '../../../../testing/utils.test';

describe('EndToEndStepper Component', () => {
	test('When loading EndToEndStepper Then Component renders', () => {
		renderWithProviders(<EndToEndStepper />);

		expect(screen.getByText('Answer legal questions')).toBeInTheDocument();
	});
});

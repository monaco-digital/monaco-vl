import React, { screen } from '@testing-library/react';

import EndToEndStepper from '.';
import { renderWithProviders } from '../../../../testing/utils.test';

describe('EndToEndStepper Component', () => {
	test('When loading EndToEndStepper Then component renders', () => {
		renderWithProviders(<EndToEndStepper step={0} />);

		expect(screen.getByTestId('stepper-component')).toBeInTheDocument();
	});
});

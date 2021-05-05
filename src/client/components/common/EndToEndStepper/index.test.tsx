import { screen } from '@testing-library/react';

import EndToEndStepper from '.';
import { renderWithProviders } from '../../../../testing/utils.test';

describe('EndToEndStepper Component', () => {
	let initialState;

	beforeEach(() => {
		initialState = {
			session: {
				currentStep: 1,
			},
		};
	});

	test('When loading EndToEndStepper Then component renders', () => {
		renderWithProviders(<EndToEndStepper />, { initialState });

		expect(screen.getByTestId('stepper-component')).toBeInTheDocument();
	});
});

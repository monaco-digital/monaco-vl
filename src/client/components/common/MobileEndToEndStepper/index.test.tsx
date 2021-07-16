import React, { screen } from '@testing-library/react';

import MobileEndToEndStepper from '.';
import { renderWithProviders } from '../../../../testing/utils.test';

describe('EndToEndStepper Component', () => {
	const nextButton = () => {
		return <div>Test Next Button</div>;
	};

	const backButton = () => {
		return <div>Test Back Button</div>;
	};

	test('When loading EndToEndStepper Then component renders', () => {
		renderWithProviders(<MobileEndToEndStepper step={0} nextButton={nextButton()} backButton={backButton()} />);

		expect(screen.getByTestId('stepper-component')).toBeInTheDocument();
	});
});

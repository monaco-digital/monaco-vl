import React from 'react';
import { Stepper, Step, StepLabel } from '@material-ui/core';
import { useSelector } from 'react-redux';

import AppState from '../../../../data/AppState';

const EndToEndStepper: React.FC = () => {
	const currentStep = useSelector<AppState, number>(state => state.session.currentStep);

	return (
		<div>
			<Stepper activeStep={currentStep} data-testid="stepper-component">
				<Step>
					<StepLabel>Advice</StepLabel>
				</Step>
				<Step>
					<StepLabel>Legal</StepLabel>
				</Step>
				<Step>
					<StepLabel>Document</StepLabel>
				</Step>
				<Step>
					<StepLabel>Settlement</StepLabel>
				</Step>
			</Stepper>
		</div>
	);
};

export default EndToEndStepper;

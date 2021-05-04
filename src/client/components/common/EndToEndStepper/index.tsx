import React from 'react';
import { Stepper, Step, StepLabel } from '@material-ui/core';
import { useSelector } from 'react-redux';

import AppState from '../../../../data/AppState';

const EndToEndStepper: React.FC = () => {
	const currentStep = useSelector<AppState, number>(state => state.session.currentStep);
	return (
		<Stepper activeStep={currentStep}>
			<Step>
				<StepLabel>Answer legal questions</StepLabel>
			</Step>
			<Step>
				<StepLabel>Send legal letter</StepLabel>
			</Step>
			<Step>
				<StepLabel>Finalise legal documents</StepLabel>
			</Step>
			<Step>
				<StepLabel>Agree a settlement</StepLabel>
			</Step>
		</Stepper>
	);
};

export default EndToEndStepper;

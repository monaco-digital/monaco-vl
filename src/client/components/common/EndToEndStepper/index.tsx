import React from 'react';
import { Stepper, Step, StepLabel } from '@material-ui/core';

interface Props {
	step: number;
}

const EndToEndStepper: React.FC<Props> = ({ step }: Props) => {
	return (
		<div className="end-to-end-stepper">
			<Stepper activeStep={step} data-testid="stepper-component">
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

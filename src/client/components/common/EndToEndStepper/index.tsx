import React from 'react';
import { Stepper, Step, StepLabel, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

interface Props {
	step: number;
}

const EndToEndStepper: React.FC<Props> = ({ step }: Props) => {
	const theme = useTheme();
	const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<div className="end-to-end-stepper">
			{!isSmall && (
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
			)}
		</div>
	);
};

export default EndToEndStepper;

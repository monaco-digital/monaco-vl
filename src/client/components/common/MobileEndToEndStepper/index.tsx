import React from 'react';
import { Box, MobileStepper } from '@material-ui/core';

interface Props {
	step: number;
	nextButton: any;
	backButton: any;
}

const MobileEndToEndStepper: React.FC<Props> = ({ step, nextButton, backButton }: Props) => {
	return (
		<div className="mobile-end-to-end-stepper">
			<Box display={{ xs: 'block', md: 'none' }}>
				<MobileStepper
					variant="dots"
					steps={4}
					position="static"
					activeStep={step}
					nextButton={nextButton}
					backButton={backButton}
					data-testid="stepper-component"
				/>
			</Box>
		</div>
	);
};

export default MobileEndToEndStepper;

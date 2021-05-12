import React from 'react';
import { mdiNumeric4Circle } from '@mdi/js';
import Icon from '@mdi/react';
import { Fab, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import EndToEndStepper from '../EndToEndStepper';

export const Settlement: React.FC = () => {
	const history = useHistory();
	const iconColour = '#60ABFF';
	const iconSize = 1.2;

	const handleGoForward = () => {
		history.push('/step/cdf/form');
	};

	const handleGoBackward = () => {
		history.goBack();
	};

	return (
		<div className="flex-col w-full">
			<EndToEndStepper step={3} />
			<div className="step-intro">
				<div className="step-intro__icon-and-header">
					<Icon
						path={mdiNumeric4Circle}
						title="4 icon"
						size={iconSize}
						color={iconColour}
						className="step-intro__number-icon"
					/>
					<Typography variant="h4">Agree settlement</Typography>
				</div>
				<Typography variant="body1" paragraph>
					Ok, so now you’ve read your advice note, you’ve generated your legal letter, and you’ve generated a further
					response to your employer. It’s up to you whether to proceed to negotiate a settlement but bear in mind that:
				</Typography>
				<Typography variant="body1" paragraph component="div">
					<ul className="list-disc">
						<li>If your employer receives a formal letter they will take you more seriously</li>
						<li>We can send the letter for you </li>
						<li>Most cases settle out of court</li>
					</ul>
				</Typography>
				<Typography variant="body1" paragraph>
					If you do want us to send the letter/s for you, our fee is 10% of any increase in settlement achieved (if you
					already have an offer our fee won’t apply to that). You can proceed to request a callback to discuss this.
				</Typography>

				<div className="step-intro__buttons">
					<Fab variant="extended" color="inherit" className="step-intro__button" onClick={handleGoBackward}>
						Back
					</Fab>
					<Fab variant="extended" id="nextButton" color="secondary" onClick={handleGoForward}>
						Next
					</Fab>
				</div>
			</div>
		</div>
	);
};

export default Settlement;

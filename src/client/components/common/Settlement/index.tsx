import React from 'react';
import { mdiNumeric4Circle } from '@mdi/js';
import Icon from '@mdi/react';
import { Fab, Link, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import EndToEndStepper from '../EndToEndStepper';
import MobileEndToEndStepper from '../MobileEndToEndStepper';

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

	const nextButton = () => {
		return (
			<Fab variant="extended" id="nextButton" color="secondary" onClick={handleGoForward}>
				Next
			</Fab>
		);
	};

	const backButton = () => {
		return (
			<Fab variant="extended" color="inherit" className="step-intro__button" onClick={handleGoBackward}>
				Back
			</Fab>
		);
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
					Ok, so now you’ve read your advice note, you’ve generated your ‘without prejudice’ letter, and you’ve
					generated a further response to your employer, whether that is another ‘without prejudice letter, a grievance
					or a ‘Grounds of Claim’ tribunal document. If you want to leave your job and negotiate an exit package:
				</Typography>
				<Typography variant="body1" paragraph component="div">
					<ul className="list-disc">
						<li>If your employer receives a formal letter they will take you more seriously</li>
						<li>We can send the letter for you </li>
						<li>Most cases settle out of court</li>
					</ul>
				</Typography>
				<Typography variant="body1" paragraph>
					If you want us to check and send the letters in this service for you, our fee for the entire service is £75 up
					front + 20% of any increase in settlement achieved (if you already have an offer our fee won’t apply to that).{' '}
					<Link href="/cdf/form" color="primary">
						Contact us
					</Link>{' '}
					for full terms of use.
				</Typography>

				<div className="step-intro__buttons navigation-buttons">
					{backButton()}
					{nextButton()}
				</div>
				<div className="w-full">
					<MobileEndToEndStepper step={3} nextButton={nextButton()} backButton={backButton()} />
				</div>
			</div>
		</div>
	);
};

export default Settlement;

import React from 'react';
import { mdiNumeric2Circle } from '@mdi/js';
import Icon from '@mdi/react';
import { Fab, Link, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const Step2Intro: React.FC = () => {
	const iconColour = '#60ABFF';
	const iconSize = 1.2;

	const history = useHistory();

	const handleNext = () => {
		history.push('/preview/_WP');
	};

	const handleBack = () => {
		history.goBack();
	};

	return (
		<div className="step-intro">
			<div className="step-intro__icon-and-header">
				<Icon
					path={mdiNumeric2Circle}
					title="2 icon"
					size={iconSize}
					color={iconColour}
					className="step-intro__number-icon"
				/>
				<Typography variant="h4">Write letter</Typography>
			</div>
			<Typography variant="body1" paragraph>
				Well done, you have answered your quick questions and generated your advice note. Hopefully you emailed the
				advice note to yourself to read later. Now you can discover what a legal letter would look like. Proceed to:
			</Typography>
			<Typography variant="body1" paragraph component="div">
				<ul className="list-disc">
					<li>Generate legal letter template and email it to yourself</li>
					<li>Fill in the gaps using your advice note to help you</li>
					<li>
						Use our{' '}
						<Link
							href="https://www.monacosolicitors.co.uk/free-settlement-agreement-calculator/"
							target="_blank"
							rel="noopener"
							color="primary"
						>
							calculator
						</Link>{' '}
						to see how much money to ask for
					</li>
				</ul>
			</Typography>

			<Typography variant="body1" paragraph>
				Once you have filled in the gaps, you can send it to us and we can send it to your employer for you. It would
				look better coming from us! Our fee would be 10% of any settlement achieved. Or you can do it yourself for free.
				Request a callback to discuss this with our customer service advisers.
			</Typography>
			<div className="step-intro__buttons">
				<Fab variant="extended" id="backButton" color="inherit" className="step-intro__button" onClick={handleBack}>
					Back
				</Fab>
				<Fab variant="extended" id="nextButton" color="secondary" onClick={handleNext}>
					Next
				</Fab>
			</div>
		</div>
	);
};

export default Step2Intro;

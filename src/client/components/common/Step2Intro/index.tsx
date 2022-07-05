import React from 'react';
import { mdiNumeric2Circle } from '@mdi/js';
import Icon from '@mdi/react';
import { Link, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import EndToEndStepper from '../EndToEndStepper';
import ActionBar from '../ActionBar';

const Step2Intro: React.FC = () => {
	const iconColour = '#60ABFF';
	const iconSize = 1.2;

	const history = useHistory();

	const handleNext = () => {
		history.push('/preview/_WP');
	};

	return (
		<div className="flex-col w-full">
			<EndToEndStepper step={1} />
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
					Great, you successfully generated and downloaded your Advice Note, which you will need later on.
					<br /> <br />
					Now you can:
				</Typography>
				<Typography variant="body1" paragraph component="div">
					<ul className="list-disc">
						<li>Generate and download your Without Prejudice legal letter template</li>
						<li>Fill in the gaps where shown, using the information contained in your Advice Note for guidance</li>
						<li>Use our calculator to see how much money to ask for</li>
						<li>Send the letter to your employer</li>
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
						<li>Send the letter to your employer.</li>
					</ul>
				</Typography>
				<ActionBar step={1} nextHandler={handleNext} />
			</div>
		</div>
	);
};

export default Step2Intro;

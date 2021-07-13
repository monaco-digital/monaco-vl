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
					Well done, you answered your quick questions and generated your advice note, which you emailed to yourself to
					read later. Now you can discover what a legal letter would look like. <br /> <br />
					Next:
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
						<li>Send the letter to your employer</li>
					</ul>
				</Typography>

				<Typography variant="body1" paragraph>
					Want your letter to have a greater impact? <br />
					We can check your letters and send them to your employer for you. That includes any follow up letters that you
					generate from this tool as well. Our fee for this service is £75 + 20% of any increase in settlement achieved
					(if you already have an offer our fee won’t apply to that).{' '}
					<Link href="/cdf/form" color="primary">
						Contact us
					</Link>{' '}
					for full terms of use.
				</Typography>
				<ActionBar step={1} nextHandler={handleNext} />
			</div>
		</div>
	);
};

export default Step2Intro;

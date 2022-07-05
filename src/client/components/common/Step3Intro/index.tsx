import React, { useState } from 'react';
import { mdiNumeric3Circle } from '@mdi/js';
import Icon from '@mdi/react';
import { Link, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import EndToEndStepper from '../EndToEndStepper';
import ActionBar from '../ActionBar';

const Step3Intro: React.FC = () => {
	const iconColour = '#60ABFF';
	const iconSize = 1.2;

	const history = useHistory();

	const [selectedOption, setSelectedOption] = useState('');

	const optionsToShow = [
		{ text: 'My employer has replied to my letter', optionId: '0' },
		{ text: 'My employer is ignoring me', optionId: '1' },
		{ text: 'My 3 month time limit is running out', optionId: '2' },
	];

	const handleNext = () => {
		switch (selectedOption) {
			case '0':
				history.push('/respond-to-employer');
				break;
			case '1':
				history.push('/grievance-explanation');
				break;
			case '2':
				history.push('/employment-tribunal-explanation');
				break;
			default:
				break;
		}
	};

	const options = optionsToShow.map(option => {
		const { text } = option;
		const { optionId } = option;

		return (
			<div key={optionId} className="topic inline-flex">
				<input
					type="checkbox"
					id={optionId}
					name={text}
					value={text}
					onChange={() => setSelectedOption(optionId)}
					checked={selectedOption === optionId}
				/>
				<label htmlFor={optionId}>
					<div className="inline-flex items-center content-center">{text}</div>
				</label>
			</div>
		);
	});

	return (
		<div className="flex-col w-full">
			<EndToEndStepper step={2} />
			<div className="step-intro">
				<div className="step-intro__icon-and-header">
					<Icon
						path={mdiNumeric3Circle}
						title="3 icon"
						size={iconSize}
						color={iconColour}
						className="step-intro__number-icon"
					/>
					<Typography variant="h4">Negotiate</Typography>
				</div>
				<Typography variant="body1" paragraph>
					Well done for getting this far. By now you have generated your Advice Note and also your initial Without
					Prejudice legal letter. If you have sent your letter then your employer should respond shortly.
				</Typography>
				<Typography variant="body1" paragraph>
					Depending on your employer’s response, you can generate one of three documents to progress your negotiation.
				</Typography>
				<Typography variant="body1" paragraph>
					<b>1. Response Letter:</b> If your employer has replied to your letter, you can generate a response letter.
					purpose of this is to tie off the negotiation at a suitable level.
				</Typography>
				<Typography variant="body1" paragraph>
					<b>2. Grievance Letter:</b> If your employer is ignoring you or the negotiation has stalled, you can generate
					formal grievance letter (see your advice note for more information).
					<p>
						The purpose of the grievance letter is to force your employer to respond and set out their side of the
						story.
					</p>
				</Typography>
				<Typography variant="body1" paragraph>
					<b>3. Employment Tribunal Claim:</b> If your{' '}
					<Link
						href="https://www.monacosolicitors.co.uk/tribunals/time-limits/"
						target="_blank"
						rel="noopener"
						color="primary"
					>
						3 month time limit
					</Link>{' '}
					is running out, you should{' '}
					<Link
						href="https://www.monacosolicitors.co.uk/tribunals/commencing-the-acas-pre-claim-process-for-employment-tribunals/"
						target="_blank"
						rel="noopener"
						color="primary"
					>
						Contact ACAS
					</Link>{' '}
					and also start putting together an employment tribunal claim. You may have to issue a claim just to get the
					employer to negotiate. Most claims settle out of court.
				</Typography>
				<Typography variant="body1" paragraph>
					To proceed with one of the above documents, choose one of the following options:
				</Typography>
				<div className="step-intro__options">{options}</div>
				<ActionBar step={2} nextHandler={handleNext} nextDisabled={selectedOption === ''} />
			</div>
		</div>
	);
};

export default Step3Intro;

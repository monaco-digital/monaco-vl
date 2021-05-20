import React, { useState } from 'react';
import { mdiNumeric3Circle } from '@mdi/js';
import Icon from '@mdi/react';
import { Fab, Link, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import EndToEndStepper from '../EndToEndStepper';

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

	const handleBack = () => {
		history.goBack();
	};

	const handleOnClick = () => {
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
					Well done. By now you have generated your advice note and also your initial legal letter. If you have sent
					your letter (or if we have sent it for you) then your employer should respond.
				</Typography>
				<Typography variant="body1" paragraph>
					Depending on their response, you can generate one of three documents to progress your negotiation.
				</Typography>
				<Typography variant="body1" paragraph>
					If your employer has replied to your letter, you can generate a response letter. The purpose of this is to tie
					off the negotiation at a suitable level.
				</Typography>
				<Typography variant="body1" paragraph>
					If your employer is ignoring you or the negotiation has stalled, you can generate a formal grievance letter
					(see your advice note for more info). The purpose of this is to force your employer to respond and set out
					their side of the story.
				</Typography>
				<Typography variant="body1" paragraph>
					If your{' '}
					<Link
						href="https://www.monacosolicitors.co.uk/tribunals/time-limits/"
						target="_blank"
						rel="noopener"
						color="primary"
					>
						3 month time limit
					</Link>{' '}
					is running out, you can{' '}
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
					Choose one of the following options:
				</Typography>
				<div className="step-intro__options">{options}</div>
				<div className="step-intro__buttons">
					<Fab variant="extended" color="inherit" className="step-intro__button" onClick={handleBack}>
						Back
					</Fab>
					<Fab variant="extended" color="secondary" disabled={selectedOption === ''} onClick={handleOnClick}>
						Next
					</Fab>
				</div>
			</div>
		</div>
	);
};

export default Step3Intro;

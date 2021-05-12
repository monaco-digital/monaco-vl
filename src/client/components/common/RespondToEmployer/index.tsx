import React, { useState } from 'react';
import { Fab, Link, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import EndToEndStepper from '../EndToEndStepper';

const RespondToEmployer: React.FC = () => {
	const history = useHistory();

	const [selectedOption, setSelectedOption] = useState('');

	const optionsToShow = [
		{ text: '(i) My employer is denying everything', optionId: '_RES_CD' },
		{ text: '(ii) My employer has made a settlement offer', optionId: '_RES_CO' },
		{ text: '(iii) My employer says they are investigating', optionId: '_RES_I' },
		{ text: "(iv) My employer said they don't want me to leave", optionId: '_RES_KM' },
	];

	const handleBack = () => {
		history.goBack();
	};

	const handleOnClick = () => {
		switch (selectedOption) {
			case '_RES_CD':
				history.push('/preview/_RES_CD');
				break;
			case '_RES_CO':
				history.push('/preview/_RES_CO');
				break;
			case '_RES_I':
				history.push('/preview/_RES_I');
				break;
			case '_RES_KM':
				history.push('/preview/_RES_KM');
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
				<Typography variant="body1" paragraph>
					Ok so your employer has replied to your legal letter and you want to generate a response to send back to them.
				</Typography>
				<Typography variant="body1" paragraph>
					The purpose of this is to progress the negotiation with the aim of finalising it at an acceptable level of
					compensation.
				</Typography>
				<Typography variant="body1" paragraph>
					Remember to try our{' '}
					<Link
						href="https://www.monacosolicitors.co.uk/free-settlement-agreement-calculator/"
						target="_blank"
						rel="noopener"
						color="primary"
					>
						calculator
					</Link>{' '}
					to get an idea of how much to ask for.
				</Typography>
				<Typography variant="body1" paragraph>
					You now have 4 template letters to choose from depending on what your employer is saying:
				</Typography>
				<Typography variant="body1" paragraph>
					Once you have filled in the gaps, you can send it to us and we can send it to your employer for you. If you
					want us to send the letters in this service for you, our fee for the entire service is 10% of any increase in
					settlement achieved (if you already have an offer our fee won’t apply to that).{' '}
					<Link href="/cdf/form" color="primary">
						Contact us
					</Link>{' '}
					for full terms of use.
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

export default RespondToEmployer;

import React, { useState } from 'react';
import { Fab, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const RespondToEmployer: React.FC = () => {
	const history = useHistory();

	const [selectedOption, setSelectedOption] = useState('');

	const optionsToShow = [
		{ text: '(i) My employer is denying everything', optionId: '_RES_CD' },
		{ text: '(ii) My employer has made a settlement offer', optionId: '_RES_CO' },
		{ text: '(iii) My employer says they are investigating', optionId: '_RES_I' },
		{ text: "(iv) My employer said they don't want me to leave", optionId: '_RES_KM' },
	];

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
		<div className="step-intro">
			<Typography variant="h4">Template letters for responding to your employer</Typography>
			<div className="step-intro__text">
				<Typography variant="body1">
					You now have 4 template letters to choose from depending on what they said:
				</Typography>
			</div>
			<div className="step-intro__options">{options}</div>
			<div className="step-intro__buttons">
				<Fab variant="extended" color="inherit" className="step-intro__button">
					Back
				</Fab>
				<Fab variant="extended" color="secondary" disabled={selectedOption === ''} onClick={handleOnClick}>
					Next
				</Fab>
			</div>
		</div>
	);
};

export default RespondToEmployer;

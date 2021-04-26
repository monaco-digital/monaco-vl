import React, { useState } from 'react';
import { mdiNumeric3Circle } from '@mdi/js';
import Icon from '@mdi/react';
import { Fab, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

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

	const handleOnClick = () => {
		switch (selectedOption) {
			case '1': // 'My employer is ignoring me'
				history.push('/preview/_GR');
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
			<div className="step-intro__icon-and-header">
				<Icon
					path={mdiNumeric3Circle}
					title="3 icon"
					size={iconSize}
					color={iconColour}
					className="step-intro__number-icon"
				/>
				<Typography variant="h4">Progress legal case</Typography>
			</div>
			<div className="step-intro__text">
				<Typography variant="body1">You now have 3 options depending on how your employer reacts:</Typography>
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

export default Step3Intro;

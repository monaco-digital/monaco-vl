import React from 'react';
import { mdiNumeric3Circle } from '@mdi/js';
import Icon from '@mdi/react';
import { Button, Fab, Typography } from '@material-ui/core';

const Step3Intro: React.FC = () => {
	const iconColour = '#60ABFF';
	const iconSize = 1.2;

	return (
		<div className="step-2-intro">
			<div className="step-2-intro__icon-and-header">
				<Icon
					path={mdiNumeric3Circle}
					title="3 icon"
					size={iconSize}
					color={iconColour}
					className="step-2-intro__number-icon"
				/>
				<Typography variant="h4">Progress legal case</Typography>
			</div>
			<div className="step-2-intro__bullets">
				<Typography variant="body1">You now have 3 options depending on how your employer reacts</Typography>
			</div>
			<div>
				<Button variant="contained">
					View template letter for responding to your employer (if your employer has replied to your letter)
				</Button>
				<Button variant="contained">View template formal grievance letter (if your employer is ignoring you)</Button>
				<Button variant="contained">
					View template employment tribunal document (if your three month time limit is running out)
				</Button>
			</div>
			<div className="step-2-intro__buttons">
				<Fab variant="extended" color="inherit" className="step-2-intro__button">
					Back
				</Fab>
				<Fab variant="extended" color="secondary">
					Next
				</Fab>
			</div>
		</div>
	);
};

export default Step3Intro;

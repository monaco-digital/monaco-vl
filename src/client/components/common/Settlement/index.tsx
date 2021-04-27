import React from 'react';
import { mdiNumeric4Circle } from '@mdi/js';
import Icon from '@mdi/react';
import { Fab, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export const Settlement: React.FC = () => {
	const history = useHistory();
	const iconColour = '#60ABFF';
	const iconSize = 1.2;

	const handleGoForward = () => {
		history.push('/cdf/form');
	};

	const handleGoBackward = () => {
		history.goBack();
	};

	return (
		<div className="step-intro">
			<div className="step-intro__icon-and-header">
				<Icon
					path={mdiNumeric4Circle}
					title="4 icon"
					size={iconSize}
					color={iconColour}
					className="step-intro__number-icon"
				/>
				<Typography variant="h4">Reach Settlement</Typography>
			</div>
			<div className="step-intro__text">
				<Typography variant="body1" paragraph>
					If you complete one of your legal letter templates & send it to us, we can send it to your employer for free.
				</Typography>
				<Typography variant="body1" paragraph>
					If you are offered a settlement we can represent you at no charge to you.
				</Typography>
				<Typography variant="body1" paragraph>
					Just request a callback and we will talk you through it.
				</Typography>
			</div>
			<div className="step-intro__buttons">
				<Fab variant="extended" color="inherit" className="step-intro__button" onClick={handleGoBackward}>
					Back
				</Fab>
				<Fab variant="extended" id="nextButton" color="secondary" onClick={handleGoForward}>
					Next
				</Fab>
			</div>
		</div>
	);
};

export default Settlement;

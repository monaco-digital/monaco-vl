import React from 'react';
import { mdiNumeric4Circle } from '@mdi/js';
import Icon from '@mdi/react';
import { Box, Fab, Typography } from '@material-ui/core';

const Settlement: React.FC = () => {
	const iconColour = '#60ABFF';
	const iconSize = 1.2;

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
			<div className="step-intro__bullets">
				<ul className="list-disc">
					<Typography variant="body1">
						<p>
							If you complete one of your legal letter templates & send it to us, we can send it to your employer for
							free.
						</p>
						<p>If you are offered a settlement we can represent you at no charge to you</p>
						<p>Just request a callback and we will talk you through it</p>
					</Typography>
				</ul>
			</div>
			<div className="step-intro__buttons">
				<Fab variant="extended" color="inherit" className="step-intro__button">
					Back
				</Fab>
				<Fab variant="extended" color="secondary">
					Next
				</Fab>
			</div>
		</div>
	);
};

export default Settlement;

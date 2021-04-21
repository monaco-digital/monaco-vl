import React from 'react';
import { mdiNumeric2Circle } from '@mdi/js';
import Icon from '@mdi/react';
import { Box, Fab, Typography } from '@material-ui/core';

const Step2Intro: React.FC = () => {
	const iconColour = '#60ABFF';
	const iconSize = 1.2;

	return (
		<div className="step-2-intro">
			<div className="step-2-intro__icon-and-header">
				<Icon
					path={mdiNumeric2Circle}
					title="2 icon"
					size={iconSize}
					color={iconColour}
					className="step-2-intro__number-icon"
				/>
				<Typography variant="h4">Start legal letter process</Typography>
			</div>
			<div className="step-2-intro__bullets">
				<ul className="list-disc">
					<Typography variant="body1">
						<li>Download template letter</li>
						<li>Fill in the gaps</li>
						<li>Send to your employer</li>
					</Typography>
				</ul>
			</div>
			<Box width="100%" display="flex" flexDirection="row" justifyContent="flex-end">
				<Box px={1}>
					<Fab variant="extended" color="inherit">
						Back
					</Fab>
				</Box>
				<Box px={1}>
					<Fab variant="extended" color="primary">
						Next
					</Fab>
				</Box>
			</Box>
		</div>
	);
};

export default Step2Intro;

import React from 'react';
import { mdiNumeric2Circle } from '@mdi/js';
import Icon from '@mdi/react';
import { Typography } from '@material-ui/core';

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
			<div>
				<ul className="list-disc">
					<Typography variant="body1">
						<li>Download template letter</li>
						<li>Fill in the gaps</li>
						<li>Send to your employer</li>
					</Typography>
				</ul>
			</div>
		</div>
	);
};

export default Step2Intro;

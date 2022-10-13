import React from 'react';
import { mdiNumeric4Circle } from '@mdi/js';
import Icon from '@mdi/react';
import { Link, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import EndToEndStepper from '../EndToEndStepper';
import ActionBar from '../ActionBar';

export const Settlement: React.FC = () => {
	const history = useHistory();
	const iconColour = '#60ABFF';
	const iconSize = 1.2;

	const handleGoForward = () => {
		history.push('/step/cdf/form');
	};

	return (
		<div className="flex-col w-full">
			<EndToEndStepper step={3} />
			<div className="step-intro">
				<div className="step-intro__icon-and-header">
					<Icon
						path={mdiNumeric4Circle}
						title="4 icon"
						size={iconSize}
						color={iconColour}
						className="step-intro__number-icon"
					/>
					<Typography variant="h4">Please tell us what you think.</Typography>
				</div>
				<Typography variant="body1" paragraph>
					<br />
					<p>
						Did you like our free service? If so please share it with friends and colleagues who could benefit too. We
						would also really appreciate it if you could spend a couple of minutes completing our survey
						<Link href="https://grapple.involve.me/grapple-user-survey" target="_blank" rel="nofollow noreferrer">
							<b> here</b>
						</Link>{' '}
					</p>
					<br />
				</Typography>
			</div>
		</div>
	);
};

export default Settlement;

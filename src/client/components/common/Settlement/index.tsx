import React from 'react';
import { mdiNumeric4Circle } from '@mdi/js';
import Icon from '@mdi/react';
import { Typography } from '@material-ui/core';
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
					<Typography variant="h4">Agree settlement</Typography>
				</div>
				<Typography variant="body1" paragraph>
					Ok, so now you’ve read your advice note, you’ve generated your ‘without prejudice’ letter, and you’ve
					generated a further response to your employer, whether that is another ‘without prejudice letter, a grievance
					or a ‘Grounds of Claim’ tribunal document. If you want to leave your job and negotiate an exit package:
				</Typography>
				<Typography variant="body1" paragraph component="div">
					<ul className="list-disc">
						<li>If your employer receives a formal letter they will take you more seriously</li>
						<li>We can send the letter for you </li>
						<li>Most cases settle out of court</li>
					</ul>
				</Typography>
				<ActionBar step={3} nextHandler={handleGoForward} />
			</div>
		</div>
	);
};

export default Settlement;

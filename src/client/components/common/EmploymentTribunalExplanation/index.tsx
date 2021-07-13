import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Link } from '@material-ui/core';
import EndToEndStepper from '../EndToEndStepper';
import ActionBar from '../ActionBar';

const EmploymentTribunalExplanation: React.FC = () => {
	const history = useHistory();

	const handleNext = () => {
		history.push('/preview/_ET');
	};

	return (
		<div className="flex-col w-full">
			<EndToEndStepper step={3} />
			<div className="step-intro">
				<Typography variant="body1" paragraph>
					So, your 3 month time limit is running out. You should{' '}
					<Link
						href="https://www.monacosolicitors.co.uk/tribunals/commencing-the-acas-pre-claim-process-for-employment-tribunals/"
						target="_blank"
						rel="noopener"
						color="primary"
					>
						Contact ACAS
					</Link>{' '}
					and then start putting together an employment tribunal claim. You may have to issue a claim just to get the
					employer to negotiate. Most claims settle out of court.
				</Typography>
				<Typography variant="body1" paragraph>
					On the next page you can find a draft Grounds of Claim document which you can send to the employment tribunal
					when you submit a claim online. It’s the part of the online form which asks you to describe what happened to
					you.
				</Typography>
				<ActionBar step={2} nextHandler={handleNext} />
			</div>
		</div>
	);
};

export default EmploymentTribunalExplanation;

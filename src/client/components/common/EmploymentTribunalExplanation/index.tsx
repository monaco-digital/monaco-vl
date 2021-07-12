import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Fab, Typography, Link } from '@material-ui/core';
import EndToEndStepper from '../EndToEndStepper';
import MobileEndToEndStepper from '../MobileEndToEndStepper';

const EmploymentTribunalExplanation: React.FC = () => {
	const history = useHistory();

	const handleClick = () => {
		history.push('/preview/_ET');
	};

	const handleGoBack = () => {
		history.goBack();
	};

	const nextButton = () => {
		return (
			<Box px={1}>
				<Fab variant="extended" color="secondary" onClick={handleClick}>
					Next
				</Fab>
			</Box>
		);
	};

	const backButton = () => {
		return (
			<Box px={1}>
				<Fab variant="extended" color="inherit" onClick={handleGoBack}>
					Back
				</Fab>
			</Box>
		);
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
				<div className="navigation-buttons">
					<Box mt={3} width="100%" display="flex" flexDirection="row" justifyContent="flex-end">
						{backButton()}
						{nextButton()}
					</Box>
				</div>
				<div className="w-full">
					<MobileEndToEndStepper step={2} nextButton={nextButton()} backButton={backButton()} />
				</div>
			</div>
		</div>
	);
};

export default EmploymentTribunalExplanation;

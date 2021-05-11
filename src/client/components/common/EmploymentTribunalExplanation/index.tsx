import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Fab } from '@material-ui/core';

const EmploymentTribunalExplanation: React.FC = () => {
	const history = useHistory();

	const handleClick = () => {
		history.push('/preview/_ET');
	};

	const handleGoBack = () => {
		history.goBack();
	};

	return (
		<div className="employment-tribunal-explanation">
			<h1>Starting an Employment Tribunal Claim</h1>
			<p>
				<i>
					If your 3 month time limit is running out, you should start the process of making a claim to the Employment
					tribunal. This requires you submit an ET1 claim form online.
				</i>
			</p>
			<Box mt={3} width="100%" display="flex" flexDirection="row" justifyContent="flex-end">
				<Box px={1}>
					<Fab variant="extended" color="inherit" onClick={handleGoBack}>
						Back
					</Fab>
				</Box>
				<Box px={1}>
					<Fab variant="extended" color="secondary" onClick={handleClick}>
						Next
					</Fab>
				</Box>
			</Box>
		</div>
	);
};

export default EmploymentTribunalExplanation;

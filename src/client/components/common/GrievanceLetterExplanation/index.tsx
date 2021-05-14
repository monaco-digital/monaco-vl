import React from 'react';
import { Fab, Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const GrievanceLetterExplanation: React.FC = () => {
	const history = useHistory();

	const handleClick = () => {
		history.push('/preview/_GR');
	};

	const handleGoBack = () => {
		history.goBack();
	};

	return (
		<div className="grievance-explanation">
			<h1>Send a Grievance Letter</h1>
			<p>
				<i>
					If your employer is ignoring you, you’ll want to send them a formal grievance letter. This makes sure that
					everything is on the record and can be used in later court cases.
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

export default GrievanceLetterExplanation;

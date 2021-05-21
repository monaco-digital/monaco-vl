import React from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const GetStartedButton: React.FC = () => {
	const history = useHistory();

	const handleClick = () => history.push('/questions/1');

	return (
		<Button
			variant="contained"
			className="get-started__get-started-button"
			color="primary"
			size="large"
			onClick={handleClick}
		>
			Get Started
		</Button>
	);
};

export default GetStartedButton;

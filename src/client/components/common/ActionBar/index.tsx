import React from 'react';
import { Box, Fab } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import MobileEndToEndStepper from '../MobileEndToEndStepper';

interface Props {
	step: number;
	nextDisabled?: boolean;
	nextHandler: any;
	showBackButton?: boolean; // Used for hiding the back button on the first page
}

const ActionBar: React.FC<Props> = ({ step, nextDisabled, nextHandler, showBackButton }: Props) => {
	const history = useHistory();

	const handleGoBackwards = () => {
		history.goBack();
	};

	const backButton = () => {
		return (
			<Box px={1}>
				<Fab variant="extended" color="inherit" onClick={handleGoBackwards} disabled={!showBackButton}>
					Back
				</Fab>
			</Box>
		);
	};

	const nextButton = () => {
		return (
			<Box px={1}>
				<Fab variant="extended" color="secondary" onClick={nextHandler} disabled={nextDisabled}>
					Next
				</Fab>
			</Box>
		);
	};

	return (
		<div className="w-full">
			<div className="navigation-buttons">
				<Box width="100%" display="flex" flexDirection="row" justifyContent="flex-end">
					{showBackButton && backButton()}
					{nextButton()}
				</Box>
			</div>
			<div className="w-full">
				<MobileEndToEndStepper step={step} nextButton={nextButton()} backButton={backButton()} />
			</div>
		</div>
	);
};

ActionBar.defaultProps = {
	showBackButton: true,
	nextDisabled: false,
};

export default ActionBar;

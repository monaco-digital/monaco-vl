import React, { FC } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import headerImage from '../../../assets/img/document.svg';

const PaymentComplete: FC = () => {
	const history = useHistory();

	return (
		<Grid container justifyContent="center" direction="column" alignItems="center" className="space-y-5 max-w-xs">
			<div>
				<img src={headerImage} width="80" height="80" alt="" />
			</div>
			<Typography variant="h5">Payment Complete</Typography>
			<div>Your document has been emailed to you</div>
			<Button
				variant="contained"
				size="large"
				color="secondary"
				onClick={() => {
					history.push('/preview/checkout/cdf1');
				}}
			>
				Request Callback
			</Button>
		</Grid>
	);
};

export default PaymentComplete;

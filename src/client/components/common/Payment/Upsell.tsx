import React, { FC } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import monacoLogo from '../../../assets/img/ms-logo-blue-black.svg';

const Upsell: FC = () => {
	const history = useHistory();

	return (
		<div className="max-w-xs space-y-5">
			<img className="w-48" alt="Virtual lawyer" src={monacoLogo} />

			<Typography variant="h5">Congratulations!</Typography>

			<p>You have created a legal letter template, ready to send to your employer</p>
			<Typography variant="body2">
				<ul className="list-disc p-4">
					<li>Worded specifically for your situation</li>
					<li>Just complete the missing information</li>
					<li>Your employer will think you&apos;ve hired real lawyers!</li>
				</ul>
			</Typography>

			<Grid container dir="row" spacing={2} justify="flex-start">
				<Grid item xs={6}>
					<Button
						variant="contained"
						size="large"
						color="secondary"
						fullWidth
						onClick={() => {
							history.push('/preview/checkout/payment');
						}}
					>
						Buy now
					</Button>
				</Grid>
			</Grid>
		</div>
	);
};

export default Upsell;

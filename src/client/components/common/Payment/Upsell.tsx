import React, { FC } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import monacoLogo from '../../../assets/img/ms-logo-blue-black.svg';

const Upsell: FC = () => {
	const history = useHistory();

	return (
		<div className="max-w-xs space-y-5">
			<img className="w-48" alt="Virtual lawyer" src={monacoLogo} />

			<Typography variant="h5">Your legal letter</Typography>

			<p>You have created a legal letter template to send to your employer</p>
			<Typography variant="body2">
				<ul className="list-disc p-4">
					<li>Created for your type of case</li>
					<li>You just fill in the gaps</li>
					<li>They will think you’ve hired lawyers</li>
				</ul>
			</Typography>

			<Grid container dir="row" spacing={2} justify="flex-end">
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
				<Grid item xs={6} className="self-end">
					<Typography variant="h6" className="underline">
						for just £5
					</Typography>
				</Grid>
			</Grid>
		</div>
	);
};

export default Upsell;

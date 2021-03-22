import React, { useState } from 'react';
import {
	Button,
	CircularProgress,
	FormControl,
	Grid,
	InputLabel,
	Select,
	TextField,
	Typography,
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AppState from '../../../../data/AppState';
import { submitDetails } from '../../../../api/general';
import { UserData } from '../../../../types/UserData';

export const CDF1: React.FC = () => {
	const history = useHistory();
	const userData = useSelector<AppState, UserData>(state => state.session.userData);
	const { register, handleSubmit, errors, control } = useForm();
	const [succeeded, setSucceeded] = useState(false);
	const [error, setError] = useState(null);
	const [processing, setProcessing] = useState(false);

	const onSubmit = async (data): Promise<void> => {
		setProcessing(true);
		const { name, email, description, phone, salary, settlementAgreement, stillEmployed, yearsEmployed } = data;
		const uData = {
			...userData,
			description,
			phone,
			salary,
			'settlement-agreement': settlementAgreement,
			'still-employed': stillEmployed,
			'years-employed': yearsEmployed,
			name: name || userData.name,
			recipient: email || userData.recipient,
		};

		await submitDetails(uData);
		setProcessing(false);
		setSucceeded(true);
		history.push('/preview/checkout/email/complete');
	};

	return (
		<form id="cdf1-form" noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-3">
			<Typography className="text-center" variant="h5" style={{ marginTop: '30px' }}>
				Request a callback about your case
			</Typography>
			<p className="self-center text-center">
				Some optional information about you case that will help us provide a better service
			</p>
			<Grid container spacing={2}>
				{!userData?.recipient && (
					<Grid item xs={12} md={6}>
						<TextField
							name="email"
							label="Email"
							required
							inputRef={register({ required: 'Email is required' })}
							fullWidth
							error={Boolean(errors.email)}
							helperText={errors.email?.message}
							variant="filled"
						/>
					</Grid>
				)}
				{!userData?.name && (
					<Grid item xs={12} md={6}>
						<TextField
							name="name"
							label="Name"
							required
							inputRef={register({ required: 'Name is required' })}
							error={Boolean(errors.name)}
							helperText={errors.name?.message}
							fullWidth
							variant="filled"
						/>
					</Grid>
				)}
				<Grid item xs={12} md={12}>
					<TextField name="description" label="Description" inputRef={register} fullWidth multiline variant="filled" />
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField name="jobTitle" label="Job Title" inputRef={register} fullWidth variant="filled" />
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField name="phone" label="Phone" inputRef={register} fullWidth variant="filled" />
				</Grid>
				<Grid item xs={12} md={6}>
					<FormControl fullWidth>
						<InputLabel variant="filled" htmlFor="years-employed-select">
							Select Years Employed
						</InputLabel>
						<Controller
							name="yearsEmployed"
							control={control}
							as={
								<Select id="years-employed-select" variant="filled" native>
									<option aria-label="None" value="" />
									<option value="Less than 2 years">Less than 2 years</option>
									<option value="More than 2 years">More than 2 years</option>
								</Select>
							}
						/>
					</FormControl>
				</Grid>
				<Grid item xs={12} md={6}>
					<FormControl fullWidth>
						<InputLabel variant="filled" htmlFor="still-employed-select">
							Select if still employed
						</InputLabel>
						<Controller
							name="stillEmployed"
							control={control}
							as={
								<Select id="still-employed-select" ref={register} variant="filled" native>
									<option aria-label="None" value="" />
									<option value="Yes">Yes</option>
									<option value="No">No</option>
								</Select>
							}
						/>
					</FormControl>
				</Grid>
				<Grid item xs={12} md={6}>
					<FormControl fullWidth>
						<InputLabel variant="filled" htmlFor="salary-select">
							Select your salary range
						</InputLabel>
						<Controller
							control={control}
							name="salary"
							as={
								<Select id="salary-select" variant="filled" native>
									<option aria-label="None" value="" />
									<option value="£0 - £30,000">£0 - £30,000</option>
									<option value="£30,000 - £50,000">£30,000 - £50,000</option>
									<option value="£50,000 - £100,000">£50,000 - £100,000</option>
									<option value="£100,000+">£100,000+</option>
								</Select>
							}
						/>
					</FormControl>
				</Grid>
				<Grid item xs={12} md={6}>
					<FormControl fullWidth>
						<InputLabel variant="filled" htmlFor="settlement-agreement-select">
							Do you have a settlement agreement ?
						</InputLabel>
						<Controller
							name="settlementAgreement"
							control={control}
							as={
								<Select id="settlement-agreement-select" variant="filled" native>
									<option aria-label="None" value="" />
									<option value="Yes">Yes</option>
									<option value="No">No</option>
								</Select>
							}
						/>
					</FormControl>
				</Grid>
				<Grid item xs={12} md={12}>
					<Button
						disabled={processing || succeeded}
						type="submit"
						variant="contained"
						size="large"
						color="secondary"
						fullWidth
					>
						<>
							{processing && <CircularProgress size={30} thickness={5} style={{ color: 'white' }} />}
							{!processing && <span>Submit</span>}
						</>
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};

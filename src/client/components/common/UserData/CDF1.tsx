import React from 'react';
import {
	Box,
	Button,
	CircularProgress,
	FormControl,
	FormHelperText,
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
import { createCDF } from '../../../../api/general';
import { UserData } from '../../../../types/UserData';
import logo1 from '../../../assets/img/ms-logo-blue-black.svg';

export const CDF1: React.FC = () => {
	const history = useHistory();
	const userData = useSelector<AppState, UserData>(state => state.session.userData);
	const {
		register,
		handleSubmit,
		errors,
		control,
		formState: { isSubmitting },
	} = useForm();

	const onSubmit = async (data): Promise<void> => {
		const { name, email, description, phone, salary, settlementAgreement, stillEmployed, yearsEmployed } = data;
		const { templateId, topicsList } = userData;

		const uData = {
			templateId,
			topicsList,
			description,
			phone,
			salary,
			'settlement-agreement': settlementAgreement,
			'still-employed': stillEmployed,
			'years-employed': yearsEmployed,
			name: name || userData.name,
			recipient: email || userData.recipient,
		};

		await createCDF(uData);
		history.push('/preview/checkout/cdf1/complete');
	};

	return (
		<form id="cdf1-form" noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-3">
			<Box alignSelf="center">
				<img alt="Monaco Solicitors" src={logo1} width="200px" />
			</Box>

			<Typography className="text-center" variant="h4" style={{ marginTop: '30px' }}>
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
							disabled={isSubmitting}
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
							disabled={isSubmitting}
							error={Boolean(errors.name)}
							helperText={errors.name?.message}
							fullWidth
							variant="filled"
						/>
					</Grid>
				)}
				<Grid item xs={12} md={12}>
					<TextField
						name="description"
						label="Brief description of case"
						required
						rows={4}
						inputRef={register({ required: 'Description is required' })}
						error={Boolean(errors.description)}
						helperText={errors.description?.message}
						disabled={isSubmitting}
						fullWidth
						multiline
						variant="filled"
						data-testid="description"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						name="jobTitle"
						label="Job Title"
						required
						inputRef={register({ required: 'Job Title is required' })}
						error={Boolean(errors.jobTitle)}
						helperText={errors.jobTitle?.message}
						disabled={isSubmitting}
						fullWidth
						variant="filled"
						data-testid="jobTitle"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						name="phone"
						label="Phone"
						required
						inputRef={register({ required: 'Phone is required' })}
						error={Boolean(errors.phone)}
						helperText={errors.phone?.message}
						disabled={isSubmitting}
						fullWidth
						variant="filled"
						data-testid="phone"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<FormControl fullWidth variant="filled" required error={Boolean(errors.yearsEmployed)}>
						<InputLabel htmlFor="years-employed-select">Years Employed</InputLabel>
						<Controller
							name="yearsEmployed"
							control={control}
							rules={{ required: 'Years employed is required' }}
							defaultValue=""
							as={
								<Select id="years-employed-select" native required disabled={isSubmitting}>
									<option aria-label="None" value="" />
									<option value="Less than 2 years">Less than 2 years</option>
									<option value="More than 2 years">More than 2 years</option>
								</Select>
							}
						/>
						{Boolean(errors.yearsEmployed) && <FormHelperText>{errors.yearsEmployed?.message}</FormHelperText>}
					</FormControl>
				</Grid>
				<Grid item xs={12} md={6}>
					<FormControl fullWidth variant="filled" required error={Boolean(errors.stillEmployed)}>
						<InputLabel htmlFor="still-employed-select">Still employed</InputLabel>
						<Controller
							name="stillEmployed"
							control={control}
							rules={{ required: 'This is a required field' }}
							defaultValue=""
							as={
								<Select id="still-employed-select" name="stillEmployed" ref={register} native disabled={isSubmitting}>
									<option aria-label="None" value="" />
									<option value="Yes">Yes</option>
									<option value="No">No</option>
								</Select>
							}
						/>
						{Boolean(errors.stillEmployed) && <FormHelperText>{errors.stillEmployed?.message}</FormHelperText>}
					</FormControl>
				</Grid>
				<Grid item xs={12} md={6}>
					<FormControl fullWidth variant="filled" required error={Boolean(errors.salary)}>
						<InputLabel htmlFor="salary-select">Salary</InputLabel>
						<Controller
							control={control}
							name="salary"
							rules={{ required: 'Salary is required' }}
							defaultValue=""
							as={
								<Select id="salary-select" native disabled={isSubmitting}>
									<option aria-label="None" value="" />
									<option value="£0 - £30,000">£0 - £30,000</option>
									<option value="£30,000 - £50,000">£30,000 - £50,000</option>
									<option value="£50,000 - £100,000">£50,000 - £100,000</option>
									<option value="£100,000+">£100,000+</option>
								</Select>
							}
						/>
						{Boolean(errors.salary) && <FormHelperText>{errors.salary?.message}</FormHelperText>}
					</FormControl>
				</Grid>
				<Grid item xs={12} md={6}>
					<FormControl fullWidth variant="filled" required error={Boolean(errors.settlementAgreement)}>
						<InputLabel htmlFor="settlement-agreement-select">Do you have a settlement agreement ?</InputLabel>
						<Controller
							name="settlementAgreement"
							control={control}
							rules={{ required: 'This field is required' }}
							defaultValue=""
							as={
								<Select id="settlement-agreement-select" native disabled={isSubmitting}>
									<option aria-label="None" value="" />
									<option value="Yes">Yes</option>
									<option value="No">No</option>
								</Select>
							}
						/>
						{Boolean(errors.settlementAgreement) && (
							<FormHelperText>{errors.settlementAgreement?.message}</FormHelperText>
						)}
					</FormControl>
				</Grid>
				<Grid item xs={12} md={12}>
					<Button
						onClick={handleSubmit(onSubmit)}
						disabled={isSubmitting}
						type="submit"
						variant="contained"
						size="large"
						color="secondary"
						fullWidth
					>
						<>
							{isSubmitting && <CircularProgress size={30} thickness={5} style={{ color: 'white' }} />}
							{!isSubmitting && <span>Request Callback</span>}
						</>
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};

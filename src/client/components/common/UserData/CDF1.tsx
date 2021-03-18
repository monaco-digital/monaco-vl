//@ts-nocheck
import React, { useState } from 'react'
import {
	Button,
	Checkbox,
	CircularProgress,
	FormControl,
	FormControlLabel,
	Grid,
	InputLabel,
	Select,
	TextField,
	Typography,
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import AppState from '../../../../data/AppState'
import { submitDetails } from '../../../../api/general'
import { useHistory } from 'react-router-dom'

interface Props {}

export const CDF1: React.FC<Props> = (props: Props) => {
	const history = useHistory()
	const userData = useSelector<AppState, UserData>(state => state.session.userData)

	const { name, recipient: email } = userData

	const { register, handleSubmit, errors } = useForm()
	const [succeeded, setSucceeded] = useState(false)
	const [error, setError] = useState(null)
	const [processing, setProcessing] = useState(false)

	const onSubmit = async (data): Promise<void> => {
		setProcessing(true)
		const { description, phone, salary, settlementAgreement, stillEmployed, yearsEmployed } = data

		const userData: UserData = {
			name: name ? name : data.name,
			recipient: email ? email : data.email,
			description,
			phone,
			salary,
			settlementAgreement,
			stillEmployed,
			yearsEmployed,
		}

		await submitDetails(userData)
		setProcessing(false)
		setSucceeded(true)
		history.push('/preview/checkout/email/complete')
	}

	return (
		<form
			id="cdf1-form"
			noValidate
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col  flex-wrap space-y-6 max-w-xs overflow-auto"
		>
			<Typography className="self-center" variant="h5">
				Extra information
			</Typography>
			<p>Some extra information about your case that will help su provide a better service</p>
			{!email && (
				<TextField
					name="email"
					label="Email"
					inputRef={register({ required: 'Email is required' })}
					fullWidth
					error={Boolean(errors.email)}
					helperText={errors.email?.message}
					variant="filled"
				/>
			)}
			{!name && (
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
			)}
			<TextField name="description" label="Description" required inputRef={register} fullWidth variant="filled" />
			<TextField name="jobTitle" label="Job Title" required inputRef={register} fullWidth variant="filled" />
			<TextField name="phone" label="Phone" required inputRef={register} fullWidth variant="filled" />
			<TextField
				name="yearsEmployed"
				label="Years Employed"
				required
				inputRef={register}
				fullWidth
				variant="filled"
				type="number"
			/>
			<FormControl>
				<InputLabel htmlFor="years-employed">Select Years Employed</InputLabel>
				<Select
					variant="filled"
					native
					inputProps={{
						name: 'yearsEmployed',
						id: 'years-employed-select',
						inputRef: ref => {
							if (!ref) return
							register({
								value: ref.value,
							})
						},
					}}
				>
					<option aria-label="None" value="" />
					<option value={'Less than 2 years'}>Less than 2 years</option>
					<option value={'More than 2 years'}>More than 2 years</option>
				</Select>
			</FormControl>
			<FormControl>
				<InputLabel htmlFor="still-employed">Select if still employed</InputLabel>
				<Select
					variant="filled"
					native
					inputProps={{
						name: 'stillEmployed',
						id: 'still-employed-select',
						inputRef: ref => {
							if (!ref) return
							register({
								value: ref.value,
							})
						},
					}}
				>
					<option aria-label="None" value="" />
					<option value={'Yes'}>Yes</option>
					<option value={'No'}>No</option>
				</Select>
			</FormControl>
			<FormControl>
				<InputLabel htmlFor="salary">Select your salary range</InputLabel>
				<Select
					variant="filled"
					native
					inputProps={{
						name: 'salaryRange',
						id: 'salary-select',
						inputRef: ref => {
							if (!ref) return
							register({
								value: ref.value,
							})
						},
					}}
				>
					<option aria-label="None" value="" />
					<option value={'£0 - £30,000'}>£0 - £30,000</option>
					<option value={'£30,000 - £50,000'}>£30,000 - £50,000</option>
					<option value={'£50,000 - £100,000'}>£50,000 - £100,000</option>
					<option value={'£100,000+'}>£100,000+</option>
				</Select>
			</FormControl>
			<FormControl>
				<InputLabel htmlFor="still-employed">Do you have a settlement agreement document?</InputLabel>
				<Select
					variant="filled"
					native
					inputProps={{
						name: 'settlementAgreement',
						id: 'settlement-agreement-select',
						inputRef: ref => {
							if (!ref) return
							register({
								value: ref.value,
							})
						},
					}}
				>
					<option aria-label="None" value="" />
					<option value={'Yes'}>Yes</option>
					<option value={'No'}>No</option>
				</Select>
			</FormControl>

			<FormControlLabel
				control={<Checkbox name="stillEmployed" color="primary" inputRef={register} />}
				classes={{ label: 'emailModal__checkbox' }}
				label="Are you still employed"
			/>

			<Grid container dir="row" spacing={2}>
				<Grid item xs={6}>
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
	)
}

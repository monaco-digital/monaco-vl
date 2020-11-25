import React, { useState } from 'react'
import {
	Box,
	Button,
	Checkbox,
	CircularProgress,
	Collapse,
	FormControl,
	FormControlLabel,
	Grid,
	Input,
	InputLabel,
	MenuItem,
	Select,
	Theme,
} from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { submitFormToPipeDrive } from '../../../../api/pipedrive'
import { CaseTopic, Paragraph } from '../../../../data/types'

interface Props {
	selectedTopics: CaseTopic[]
	paragraphs: Paragraph[]
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& > *': {
				margin: theme.spacing(1),
			},
		},
		contactForm: {
			backgroundColor: '#ebf2ff',
			margin: '20px',
			padding: '10px',
			borderRadius: '8px',
		},
		select: {
			minWidth: '200px',
		},
		expandToggle: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
		},
		form: {
			padding: '10px',
		},
		p: {
			margin: '20px',
		},
		nwnf: {
			fontSize: '1.3em',
			fontWeight: 'bold',
		},
		leftAlign: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'flex-start',
		},
		errorMessage: {
			color: 'red',
			fontSize: '0.9em',
		},
		submittedButton: {
			background: 'green',
			color: 'whiite',
		},
		submitButton: {
			background: theme.palette.secondary.light,
		},
	})
)

export const UserDataForm: React.FC<Props> = (props: Props) => {
	const classes = useStyles()
	const { paragraphs, selectedTopics } = props

	const [showform, setShowform] = useState(true)
	const [submitStatus, setSubmitStatus] = useState(0)

	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')
	const [job, setJob] = useState('')
	const [salary, setSalary] = useState('')
	const [yearsEmployed, setYearsEmployed] = useState('')
	const [stillEmployed, setStillEmployed] = useState(true)
	const [settlementAgreement, setSettlementAgreement] = useState(false)

	const FormSubmissionStatus = {
		NOT_SUBMITTED: 0,
		SUBMITTING: 1,
		SUBMITTED_SUCCESSFULLY: 2,
		ERROR: 3,
	}

	const submitForm = async () => {
		setSubmitStatus(1)
		const fields = {
			name,
			job,
			email,
			phone,
			yearsEmployed,
			stillEmployed,
			settlementAgreement,
			selectedTopics,
			paragraphs,
		}
		try {
			await submitFormToPipeDrive(fields)
			setSubmitStatus(FormSubmissionStatus.SUBMITTED_SUCCESSFULLY)
		} catch (e) {
			setSubmitStatus(FormSubmissionStatus.ERROR)
		}
	}

	return (
		<>
			<Box className={classes.contactForm}>
				<div className={classes.expandToggle}>
					<h2 className={classes.nwnf}>Interested in a no-win, no-fee deal?</h2>
					{!showform && (
						<Button
							onClick={() => setShowform(true)}
							size="small"
							variant="outlined"
						>
							More info
						</Button>
					)}
					{!showform && (
						<Button
							onClick={() => setShowform(false)}
							size="small"
							variant="outlined"
						>
							Less
						</Button>
					)}
				</div>
				<Collapse in={showform} collapsedHeight={0} timeout={'auto'}>
					<div>
						Submit your details below and if we can help we will be in touch
						within around an hour{' '}
					</div>
					<Box className={classes.form}>
						<form className={classes.root} noValidate autoComplete="off">
							<FormControl>
								<InputLabel htmlFor="component-simple">Name</InputLabel>
								<Input
									id="component-simple"
									value={name}
									onChange={e => setName(e.target.value)}
								/>
							</FormControl>
							<FormControl>
								<InputLabel htmlFor="component-simple">Email</InputLabel>
								<Input
									id="component-simple"
									value={email}
									onChange={e => setEmail(e.target.value)}
								/>
							</FormControl>
							<FormControl>
								<InputLabel htmlFor="component-simple">Phone</InputLabel>
								<Input
									id="component-simple"
									value={phone}
									onChange={e => setPhone(e.target.value)}
								/>
							</FormControl>
							<FormControl>
								<InputLabel htmlFor="component-simple">Job title</InputLabel>
								<Input
									id="component-simple"
									value={job}
									onChange={e => setJob(e.target.value)}
								/>
							</FormControl>
							<br />

							<div className={classes.leftAlign}>
								<FormControl className={classes.select}>
									<InputLabel id="demo-simple-select-label">
										Years employed
									</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										autoWidth
										value={yearsEmployed}
										onChange={e => setYearsEmployed(e.target.value as string)}
									>
										<MenuItem value={'Less than 2'}>Less than 2</MenuItem>
										<MenuItem value={'More than 2'}>More than 2</MenuItem>
									</Select>
								</FormControl>
								<br />
								<FormControl className={classes.select}>
									<InputLabel id="demo-simple-select-label">Salary</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={salary}
										autoWidth
										onChange={e => setSalary(e.target.value as string)}
									>
										<MenuItem value={'£0 - £30000'}>£0 - £30,000</MenuItem>
										<MenuItem value={'£30,000 - £50000'}>
											£30,000 - £50,000
										</MenuItem>
										<MenuItem value={'£50,000 - £100000'}>
											£50,000 - £100,000
										</MenuItem>
										<MenuItem value={'£100,000+'}>£100,000+</MenuItem>
									</Select>
								</FormControl>
								<br />
								<FormControlLabel
									control={
										<Checkbox
											checked={settlementAgreement}
											name="settlementAgreement"
											onChange={e => setSettlementAgreement(e.target.checked)}
										/>
									}
									label="I have a settlement agreement"
								/>
								<br />
								<FormControlLabel
									control={
										<Checkbox
											checked={stillEmployed}
											name="stillEmployed"
											onChange={e => setStillEmployed(e.target.checked)}
										/>
									}
									label="I am still employed"
								/>
							</div>
							{submitStatus === FormSubmissionStatus.SUBMITTED_SUCCESSFULLY && (
								<Button
									fullWidth
									id={'submit-button'}
									variant="contained"
									disabled={true}
									className={classes.submittedButton}
								>
									Submitted
								</Button>
							)}
							{submitStatus !== FormSubmissionStatus.SUBMITTED_SUCCESSFULLY && (
								<Button
									fullWidth
									id={'submit-button'}
									variant="contained"
									disabled={submitStatus === 1}
									className={classes.submitButton}
									onClick={submitForm}
								>
									{submitStatus === FormSubmissionStatus.SUBMITTING ? (
										<CircularProgress />
									) : (
										'Request a callback'
									)}
								</Button>
							)}
							{submitStatus === FormSubmissionStatus.ERROR && (
								<div className={classes.errorMessage}>
									Something went wrong, please check your data and try again
								</div>
							)}
						</form>
					</Box>
					<p>
						<a
							style={{ color: '#2962ff' }}
							href="https://www.monacosolicitors.co.uk/virtual-lawyer-plus-terms-of-use/"
							target="_blank"
						>
							Terms of use
						</a>
					</p>
				</Collapse>
			</Box>
		</>
	)
}

import React, { useState } from 'react'
import {
	Typography,
	Box,
	Theme,
	Breadcrumbs,
	Grid,
	Button,
	TextField,
	Select,
	MenuItem,
	FormControl,
	FormControlLabel,
	FormHelperText,
	InputLabel,
	Input,
	OutlinedInput,
	FilledInput,
	Slider,
	Checkbox,
	Collapse,
	CircularProgress,
} from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { LetterBottom } from '../components/letter/LetterBottom'
import { LetterTop } from '../components/letter/LetterTop'
import { Paragraph } from '../../../data/types'
import { useSelector } from 'react-redux'
import AppState from '../../../data/AppState'
import { CustomParagraphs } from '../../../data/static'
import axios from 'axios'

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		letterStyle: {
			border: '1px solid gray',
			margin: 'auto',
			padding: '5px',
			borderRadius: '5px',
			background: 'white',
			width: '100%',
			minHeight: window.innerHeight - 250,
			textAlign: 'left',
		},
		button: {
			margin: 2,
			width: '12rem',
			color: 'black',
			background: theme.palette.secondary.light,
		},
		submitButton: {
			background: theme.palette.secondary.light,
		},
		submittedButton: {
			background: 'green',
			color: 'whiite',
		},
		root: {
			'& > *': {
				margin: theme.spacing(1),
			},
		},
		formControl: {},
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
		docButtons: {
			marginTop: '40px',
			marginBottom: '40px',
			display: 'flex',
			flexDirection: 'row',
			flexWrap: 'wrap',
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
	})
)

const FormSubmissionStatus = {
	NOT_SUBMITTED: 0,
	SUBMITTING: 1,
	SUBMITTED_SUCCESSFULLY: 2,
	ERROR: 3,
}

export const ReviewParagraphView: React.FC<Props> = (props: Props) => {
	const classes = useStyles()
	const paragraphs = useSelector<AppState, Paragraph[]>(
		state => state.paragraphs.selected ?? []
	)

	const getLetterText = () => {
		const top = CustomParagraphs.top
			.map(({ paragraph }) => paragraph)
			.join('\n\n')
		const middle = paragraphs.map(item => item.paragraph).join('\n\n')
		const bottom = CustomParagraphs.bottom
			.map(({ paragraph }) => paragraph)
			.join('\n\n')
		return top.concat(middle).concat(bottom)
	}

	const copyParasToText = () => {
		navigator.clipboard.writeText(getLetterText())
	}

	const getLetterMiddle = () => {
		return (
			<>
				{paragraphs.map(paragraph => {
					return (
						<div>
							{paragraph.paragraph}
							<br />
							<br />
						</div>
					)
				})}
			</>
		)
	}

	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')
	const [job, setJob] = useState('')
	const [salary, setSalary] = useState('')
	const [yearsEmployed, setYearsEmployed] = useState('')
	const [stillEmployed, setStillEmployed] = useState(true)
	const [settlementAgreement, setSettlementAgreement] = useState(false)

	const [showform, setShowform] = useState(true)
	const [submitStatus, setSubmitStatus] = useState(0)

	const submitForm = () => {
		setSubmitStatus(1)
		const body = {
			'call-taken-by': 'virtual lawyer',
			name: name,
			job: job,
			email: email,
			phone: phone,
			'years-employed': yearsEmployed,
			'still-employed': stillEmployed ? 'Yes' : 'No',
			salary: salary,
			'settlement-agreement': settlementAgreement ? 'Yes' : 'No',
			description: getLetterText(),
		}
		axios
			.post(
				'https://40ueg9bxdg.execute-api.eu-west-2.amazonaws.com/prod/create-deal',
				body
			)
			.then(r => setSubmitStatus(FormSubmissionStatus.SUBMITTED_SUCCESSFULLY))
			.catch(e => setSubmitStatus(FormSubmissionStatus.ERROR))
		console.log('posted', body)
	}

	return (
		<>
			<Grid container>
				<Grid item xs={2}></Grid>
				<Grid item xs={6}>
					<Box className={classes.letterStyle}>
						<LetterTop />
						{getLetterMiddle()}
						<LetterBottom />
					</Box>
				</Grid>
				<Grid item xs={4}>
					<div>
						<h1>Here is your letter</h1>
						<p className={classes.p}>
							Using your preferred word processor fill in the gaps, but keep it
							to the point
						</p>
						<p className={classes.p}>
							Our{' '}
							<a
								href="https://www.monacosolicitors.co.uk/free-settlement-agreement-calculator/"
								target="_blank"
							>
								<b>
									<u>settlement calculator</u>
								</b>
							</a>{' '}
							can help with estimated amounts
						</p>
					</div>
					<Box className={classes.docButtons}>
						<Box>
							<Button
								variant="contained"
								color="secondary"
								className={classes.button}
								onClick={() => {
									copyParasToText()
								}}
							>
								Copy Letter Text
							</Button>
						</Box>
						<Box>
							<Button
								variant="contained"
								color="secondary"
								className={classes.button}
								onClick={() => {
									copyParasToText()
								}}
								disabled
							>
								Create doc
							</Button>
						</Box>
					</Box>

					<Box className={classes.contactForm}>
						<div className={classes.expandToggle}>
							<h2 className={classes.nwnf}>
								Interested in a no-win, no-fee deal?
							</h2>
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
										<InputLabel htmlFor="component-simple">
											Job title
										</InputLabel>
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
												onChange={e =>
													setYearsEmployed(e.target.value as string)
												}
											>
												<MenuItem value={'Less than 2'}>Less than 2</MenuItem>
												<MenuItem value={'More than 2'}>More than 2</MenuItem>
											</Select>
										</FormControl>
										<br />
										<FormControl className={classes.select}>
											<InputLabel id="demo-simple-select-label">
												Salary
											</InputLabel>
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
													onChange={e =>
														setSettlementAgreement(e.target.checked)
													}
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
									{submitStatus ===
										FormSubmissionStatus.SUBMITTED_SUCCESSFULLY && (
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
									{submitStatus !==
										FormSubmissionStatus.SUBMITTED_SUCCESSFULLY && (
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
				</Grid>
			</Grid>
		</>
	)
}

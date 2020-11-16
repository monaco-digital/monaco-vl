//@ts-nocheck

import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { GetStarted } from './GetStarted'
import { FilterView } from './FilterView'
import { ReviewParagraphView } from './ReviewParagraphView'
import { Box, Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { Paragraph } from '../../../data/types'
import { getData } from '../../../api/vlmasersheet'
import { updateAll } from '../../../data/paragraphsDataSlice'
import { filterByExactTopicMatch, filterByGeneralMatch } from '../../../filters'
import { LetterParagraph } from '../components/LetterParagraph'
import AppState from '../../../data/AppState'
import App from '../../../App'

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		backgroundColor: 'white',
		height: '100vh',
	},
	header: {
		padding: '30px',
		backgroundColor: 'white',
		display: 'flex',
		flexDirection: 'row',
	},
	headerTitle: {
		fontSize: '20px',
		margin: '10px',
		fontWeight: '550',
	},
	headerTag: {
		color: 'red',
	},
	button: {
		marginRight: theme.spacing(1),
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
}))

function getSteps() {
	return [
		'Get started',
		'Tell us about your case',
		'Build your letter',
		'Review final letter',
	]
}

export default function HorizontalLinearStepper() {
	const classes = useStyles()
	//code from Main
	const dispatch = useDispatch()
	const data = useSelector<AppState>(state => state.paragraphs.all)
	const selectedTopics = useSelector<AppState>(state => state.topics.selected)

	const [activeStep, setActiveStep] = React.useState(0)
	const [skipped, setSkipped] = React.useState(new Set())
	const steps = getSteps()

	const [filteredData, setFilteredData] = useState<Paragraph[]>(data ?? [])

	// filter for exact match
	// const [filter, setFilter] = useState<string>(null)
	// const [orFitler, setOrFitler] = useState<string[]>([])

	const matches = filteredData?.length

	// const onFilterChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
	// 	setFilter(event.target.value)
	// }
	//
	// const onOrFilterChange = (topics: string[]): void => {
	// 	setOrFitler(topics)
	// }

	useEffect(() => {
		async function captureData() {
			const data = await getData()
			console.log('Adding the data 6666 : ', data)
			dispatch(updateAll(data))
		}
		captureData()
	}, [])

	useEffect(() => {
		setFilteredData(data)
	}, [data])

	useEffect(() => {
		//run filter 1
		//const newData1 = filterByExactTopicMatch(data, filter)

		//run filter 2 for or logic
		const newData2 = filterByGeneralMatch(data, selectedTopics)
		console.log('setting filtered data: ', newData2)
		setFilteredData(newData2)
	}, [selectedTopics])

	const isStepOptional = step => {
		// return step === 1;
		return false
	}

	const isStepSkipped = step => {
		return skipped.has(step)
	}

	const handleNext = () => {
		let newSkipped = skipped
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values())
			newSkipped.delete(activeStep)
		}

		setActiveStep(prevActiveStep => prevActiveStep + 1)
		setSkipped(newSkipped)
	}

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1)
	}

	const handleSkip = () => {
		if (!isStepOptional(activeStep)) {
			// You probably want to guard against something like this,
			// it should never occur unless someone's actively trying to break something.
			throw new Error("You can't skip a step that isn't optional.")
		}

		setActiveStep(prevActiveStep => prevActiveStep + 1)
		setSkipped(prevSkipped => {
			const newSkipped = new Set(prevSkipped.values())
			newSkipped.add(activeStep)
			return newSkipped
		})
	}

	const handleReset = () => {
		setActiveStep(0)
	}

	//defining get content

	const getStepContent = step => {
		switch (step) {
			case 0:
				return <GetStarted />
			case 1:
				return <FilterView />
			case 2:
				return <LetterParagraph paragraphs={filteredData} />
			case 3:
				return <ReviewParagraphView paragraphs={filteredData} />
			default:
				return 'Unknown step'
		}
	}

	return (
		<>
			<Grid container spacing={2} className={classes.root}>
				<Grid intem xs={6}>
					<div className={classes.header}>
						<h2 className={classes.headerTitle}>VIRTUAL LAWYER</h2>
						<b className={classes.headerTag}>BETA</b>
					</div>
				</Grid>
				<Grid item xs={6}>
					<Box p={2}>
						<Stepper activeStep={activeStep}>
							{steps.map((label, index) => {
								const stepProps: any = {}
								const labelProps: any = {}
								if (isStepOptional(index)) {
									labelProps.optional = (
										<Typography variant="caption">Optional</Typography>
									)
								}
								if (isStepSkipped(index)) {
									stepProps.completed = false
								}
								return (
									<Step key={label} {...stepProps}>
										<StepLabel {...labelProps}>{label}</StepLabel>
									</Step>
								)
							})}
						</Stepper>
						<div style={{ padding: '1rem' }}>
							<Button
								size="large"
								disabled={activeStep === 0}
								onClick={handleBack}
								className={classes.button}
							>
								Back
							</Button>
							{isStepOptional(activeStep) && (
								<Button
									size="large"
									variant="contained"
									color="primary"
									onClick={handleSkip}
									className={classes.button}
								>
									Skip
								</Button>
							)}
							{activeStep < steps.length - 1 && (
								<Button
									size="large"
									variant="contained"
									color="primary"
									onClick={handleNext}
									className={classes.button}
								>
									{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
								</Button>
							)}
						</div>
					</Box>
				</Grid>
				<Grid item xs={12}>
					<Grid container spacing={2} className={classes.root}>
						{activeStep === steps.length ? (
							<div>
								<Typography className={classes.instructions}>
									All steps completed - you&apos;re finished
								</Typography>
								<Button
									size="large"
									nClick={handleReset}
									className={classes.button}
								>
									Reset
								</Button>
							</div>
						) : (
							<div>
								<Typography className={classes.instructions}>
									{getStepContent(activeStep)}
								</Typography>
							</div>
						)}
					</Grid>
				</Grid>
			</Grid>
		</>
	)
}

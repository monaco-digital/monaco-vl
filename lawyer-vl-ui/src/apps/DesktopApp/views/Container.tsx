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
import { Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { Paragraph } from '../../../data/types'
import { getData } from '../../../api/vlmasersheet'
import { updateAll } from '../../../data/paragraphsDataSlice'
import { filterByExactTopicMatch, filterByGeneralMatch } from '../../../filters'
import { LetterParagraph } from '../components/LetterParagraph'
import AppState from '../../../data/AppState'

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
		margin: '10px',
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
	return ['Get started', 'Tell us about your case', 'Build your letter']
}

export default function HorizontalLinearStepper() {
	const classes = useStyles()
	//code from Main
	const dispatch = useDispatch()
	const data = useSelector<AppState>(state => state.paragraphs.all)

	const [activeStep, setActiveStep] = React.useState(0)
	const [skipped, setSkipped] = React.useState(new Set())
	const steps = getSteps()

	const [filteredData, setFilteredData] = useState<Paragraph[]>(data ?? [])

	// filter for exact match
	const [filter, setFilter] = useState<string>(null)
	const [orFitler, setOrFitler] = useState<string[]>([])

	const matches = filteredData?.length

	const onFilterChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setFilter(event.target.value)
	}

	const onOrFilterChange = (topics: string[]): void => {
		setOrFitler(topics)
	}

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
		const newData1 = filterByExactTopicMatch(data, filter)

		//run filter 2 for or logic
		const newData2 = filterByGeneralMatch(newData1, orFitler)
		console.log('setting filtered data: ', newData2)
		setFilteredData(newData2)
	}, [filter, orFitler])

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
			default:
				return 'Unknown step'
		}
	}

	return (
		<div className={classes.root}>
			<div className={classes.header}>
				<img src="https://www.monacosolicitors.co.uk/app/themes/monacosolicitors/public/img/ms-logo-blue-black.svg" />
				<h2 className={classes.headerTitle}>VIRTUAL LAWYER</h2>
				<b className={classes.headerTag}>BETA</b>
			</div>
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
			<Grid container spacing={2} className={classes.root}>
				{activeStep === steps.length ? (
					<div>
						<Typography className={classes.instructions}>
							All steps completed - you&apos;re finished
						</Typography>
						<Button onClick={handleReset} className={classes.button}>
							Reset
						</Button>
					</div>
				) : (
					<div>
						<Typography className={classes.instructions}>
							{getStepContent(activeStep)}
						</Typography>
						<div>
							<Button
								disabled={activeStep === 0}
								onClick={handleBack}
								className={classes.button}
							>
								Back
							</Button>
							{isStepOptional(activeStep) && (
								<Button
									variant="contained"
									color="primary"
									onClick={handleSkip}
									className={classes.button}
								>
									Skip
								</Button>
							)}

							<Button
								variant="contained"
								color="primary"
								onClick={handleNext}
								className={classes.button}
							>
								{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
							</Button>
						</div>
					</div>
				)}
			</Grid>
		</div>
	)
}

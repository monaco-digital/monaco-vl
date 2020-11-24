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
import { Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { getData } from '../../../api/vlmasersheet'
import { updateAll } from '../../../data/paragraphsDataSlice'
import { LetterBuilderView } from './LetterBuilderView'

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
	navHeaderBar: {
		padding: '10px',
		paddingLeft: '40px',
		paddingRight: '40px',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		fontSize: '1.2em',
		fontWeight: 'bold',
		borderTop: '1px solid gray',
		borderBottom: '1px solid gray',
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
		'Review',
	]
}

export default function HorizontalLinearStepper() {
	const classes = useStyles()
	//code from Main
	const dispatch = useDispatch()

	const [activeStep, setActiveStep] = React.useState(0)
	const [skipped, setSkipped] = React.useState(new Set())
	const steps = getSteps()

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
				return <GetStarted next={handleNext} />
			case 1:
				return <FilterView />
			case 2:
				return <LetterBuilderView />
			case 3:
				return <ReviewParagraphView />
			default:
				return 'Unknown step'
		}
	}

	useEffect(() => {
		async function captureData() {
			const data = await getData()
			console.log('Adding the data 6666 : ', data)
			dispatch(updateAll(data))
		}
		captureData()
	}, [])

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
				</Grid>
				<Grid item xs={12}>
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
								<div className={classes.navHeaderBar}>
									<Button
										disabled={activeStep === 0}
										onClick={handleBack}
										className={classes.button}
									>
										Back
									</Button>
									<div>{steps[activeStep]}</div>
									{activeStep < steps.length - 1 && (
										<Button
											variant="contained"
											color="primary"
											onClick={handleNext}
											className={classes.button}
										>
											{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
										</Button>
									)}
									{activeStep === steps.length - 1 && <div></div>}
								</div>

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

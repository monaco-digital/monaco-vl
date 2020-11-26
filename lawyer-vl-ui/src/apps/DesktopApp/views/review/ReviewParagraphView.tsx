import React, { useState } from 'react'
import { Box, Theme, Grid, Button } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { LetterBottom } from '../../components/letter/LetterBottom'
import { LetterTop } from '../../components/letter/LetterTop'
import { CaseTopic, Paragraph } from '../../../../data/types'
import { useSelector } from 'react-redux'
import AppState from '../../../../data/AppState'
import { CreateGoogleDoc } from '../../components/buttons/CreateGoogleDoc'
import { getLetterText } from '../../../../utlis/letter'
import { UserDataForm } from './UserDataForm'

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

interface Props {}
export const ReviewParagraphView: React.FC<Props> = (props: Props) => {
	const classes = useStyles()
	const paragraphs = useSelector<AppState, Paragraph[]>(
		state => state.paragraphs.selected ?? []
	)
	const selectedTopics = useSelector<AppState, CaseTopic[]>(
		state => state.topics.selected
	)

	const copyParasToText = () => {
		navigator.clipboard.writeText(getLetterText(selectedTopics, paragraphs))
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

	return (
		<>
			<Grid container>
				<Grid item xs={2}></Grid>
				<Grid item xs={6}>
					<Box className={classes.letterStyle}>
						<LetterTop selectedTopics={selectedTopics} />
						{getLetterMiddle()}
						<LetterBottom selectedTopics={selectedTopics} />
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
							<CreateGoogleDoc
								paragraphs={paragraphs}
								selectedTopics={selectedTopics}
							/>
						</Box>
					</Box>
					<UserDataForm
						selectedTopics={selectedTopics}
						paragraphs={paragraphs}
					/>
				</Grid>
			</Grid>
		</>
	)
}

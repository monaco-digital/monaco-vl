import React from 'react'
import {
	Typography,
	Box,
	Theme,
	Breadcrumbs,
	Grid,
	Button,
} from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { LetterBottom } from '../components/letter/LetterBottom'
import { LetterTop } from '../components/letter/LetterTop'
import { Paragraph } from '../../../data/types'
import { useSelector } from 'react-redux'
import AppState from '../../../data/AppState'
import { CustomParagraphs } from '../../../data/static'

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
			width: '10rem',
			color: 'black',
			background: theme.palette.secondary.light,
		},
	})
)

export const ReviewParagraphView: React.FC<Props> = (props: Props) => {
	const classes = useStyles()
	const paragraphs = useSelector<AppState, Paragraph[]>(
		state => state.paragraphs.selected ?? []
	)

	const copyParasToText = () => {
		const top = CustomParagraphs.top
			.map(({ paragraph }) => paragraph)
			.join('\n\n')
		const middle = paragraphs.map(item => item.paragraph).join('\n\n')
		const bottom = CustomParagraphs.bottom
			.map(({ paragraph }) => paragraph)
			.join('\n\n')
		const text = top.concat(middle).concat(bottom)
		navigator.clipboard.writeText(text)
	}

	const getLetterMiddle = () => {
		return (
			<>
				{paragraphs.map(paragraph => {
					return (
						<div>
							{paragraph.paragraph}
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
				<Grid item xs={3}></Grid>
				<Grid item xs={6}>
					<Box className={classes.letterStyle}>
						<LetterTop />
						{getLetterMiddle()}
						<LetterBottom />
					</Box>
				</Grid>
				<Grid item xs={3}>
					<Box style={{ marginTop: '50px' }}>
						<Typography>Please Press to Copy Text</Typography>
						<Button
							variant="contained"
							color="secondary"
							className={classes.button}
							onClick={() => {
								copyParasToText()
							}}
						>
							Copy text
						</Button>
					</Box>
				</Grid>
			</Grid>
		</>
	)
}

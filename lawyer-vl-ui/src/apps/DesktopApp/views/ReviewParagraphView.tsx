import React from 'react'
import { Typography, Box, Theme, Breadcrumbs, Grid } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { LetterBottom } from '../components/letter/LetterBottom'
import { LetterTop } from '../components/letter/LetterTop'
import { Paragraph } from 'docx'

type Props = {
	paragraphs: Paragraph[]
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		letterContainer: {
			padding: '10px',
			width: '94%',
			overflowY: 'scroll',
			background: '#eee',
			height: '85vh',
		},
		letterStyle: {
			border: '1px solid gray',
			margin: 'auto',
			padding: '10px',
			borderRadius: '5px',
			background: 'white',
			width: '94%',
			minHeight: window.innerHeight - 250,
		},
	})
)

export const ReviewParagraphView: React.FC<Props> = (props: Props) => {
	const classes = useStyles()
	const { paragraphs } = props

	const getLetterMiddle = () => {
		return paragraphs.map(paragraph => {
			return ''
		})
	}

	return (
		<>
			<Grid item xs={12} className={classes.letterContainer}>
				<Box className={classes.letterStyle}>
					<LetterTop />

					<LetterBottom />
				</Box>
			</Grid>
		</>
	)
}

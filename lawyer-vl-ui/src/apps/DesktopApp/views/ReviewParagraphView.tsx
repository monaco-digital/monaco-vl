import React from 'react'
import { Typography, Box, Theme, Breadcrumbs, Grid } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { LetterBottom } from '../components/letter/LetterBottom'
import { LetterTop } from '../components/letter/LetterTop'
import { Paragraph } from '../../../data/types'
import { useSelector } from 'react-redux'
import AppState from '../../../data/AppState'

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
	})
)

export const ReviewParagraphView: React.FC<Props> = (props: Props) => {
	const classes = useStyles()
	const paragraphs = useSelector<AppState, Paragraph[]>(
		state => state.paragraphs.selected ?? []
	)
	console.log('the paragraphs in review are: ', paragraphs)
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
			<Grid item xs={12}>
				<Box className={classes.letterStyle}>
					<LetterTop />
					{getLetterMiddle()}
					<LetterBottom />
				</Box>
			</Grid>
		</>
	)
}

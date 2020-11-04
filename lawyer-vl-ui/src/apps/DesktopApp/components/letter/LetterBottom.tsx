import React from 'react'
import { Typography, Box, Theme, createStyles } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { CustomParagraphs } from '../../../../data/static'

type Props = {}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			textAlign: 'left',
		},
	})
)

export const LetterBottom: React.FC<Props> = (props: Props) => {
	const classes = useStyles()
	const paragraphsText = CustomParagraphs.bottom.map(
		({ paragraph }) => paragraph
	)

	return (
		<Box className={classes.root}>
			{paragraphsText[0]}
			<br />
			<br />
			{paragraphsText[1]}
			<br />
			<br />
			{paragraphsText[2]}
			<br />
			<br />
			{paragraphsText[3]}
			<br />
			<br />
			{paragraphsText[4]}
			<br />
			<br />
			{paragraphsText[5]}
			<br />
			<br />
			{paragraphsText[6]}
			<br />
			<br />
		</Box>
	)
}

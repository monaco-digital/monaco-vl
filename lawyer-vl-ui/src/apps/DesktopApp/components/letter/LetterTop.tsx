import React, { useState } from 'react'
import { Typography, Box, Theme, createStyles } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { CustomParagraphs } from '../../../../data/CustomParagraphs'
import { CaseTopic } from '../../../../data/types'

interface Props {
	selectedTopics: CaseTopic[]
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			textAlign: 'left',
		},
	})
)

export const LetterTop: React.FC<Props> = (props: Props) => {
	const classes = useStyles()
	const { selectedTopics } = props
	const { top } = CustomParagraphs.getParagraphs(selectedTopics)
	const paragraphsText = top.map(({ paragraph }) => paragraph)

	return (
		<Box className={classes.root}>
			<b>{paragraphsText[0]}</b>
			<br />
			<br />
			{paragraphsText[1]}
			<br />
			{paragraphsText[2]}
			<br />
			{paragraphsText[3]}
			<br />
			<br />
			{paragraphsText[4]}
			<br />
			<br />
			<b>{paragraphsText[5]}</b>
			<br />
			<br />
			<b>{paragraphsText[6]}</b>
			<br />
			<br />
			{paragraphsText[7]}
			<br />
			<br />
			{paragraphsText[8]}
			<br />
			<br />
			{paragraphsText[9]}
		</Box>
	)
}

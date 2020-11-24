import React, { useEffect, useState } from 'react'
import { Button, useTheme, Theme, createStyles } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { callGoogleApi, createGoogleDocument } from '../../../../api/google'
import { CaseTopic, Paragraph } from '../../../../data/types'
import { getLetterText } from '../../../../utlis/letter'

interface Props {
	paragraphs: Paragraph[]
	selectedTopics: CaseTopic[]
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		button: {
			margin: 2,
			width: '15rem',
			color: 'black',
			background: theme.palette.secondary.light,
		},
	})
)

export const CreateGoogleDoc: React.FC<Props> = (props: Props) => {
	const theme = useTheme()
	const classes = useStyles(theme)
	const { paragraphs, selectedTopics } = props

	const openInGoogleDoc = async () => {
		//const document = createGoogleDocument(paragraphs);
		const shareableLink = await callGoogleApi(
			getLetterText(selectedTopics, paragraphs)
		)
		console.log('The response for the document is from google: ', shareableLink)
		window.open(shareableLink, '_blank')
	}

	return (
		<>
			<Button
				variant="contained"
				color="secondary"
				onClick={openInGoogleDoc}
				className={classes.button}
			>
				View in Google Doc
			</Button>
		</>
	)
}

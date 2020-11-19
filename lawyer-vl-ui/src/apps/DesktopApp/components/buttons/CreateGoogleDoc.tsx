import React, { useEffect, useState } from 'react'
import {
	Typography,
	Box,
	Button,
	useTheme,
	Theme,
	createStyles,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { callGoogleApi, createGoogleDocument } from '../../../../api/google'
import { useSelector } from 'react-redux'
import AppState from '../../../../data/AppState'
import { Paragraph } from '../../../../data/types'
import { CustomParagraphs } from '../../../../data/static'

type Props = {}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		button: {
			margin: 2,
			color: 'black',
			background: '#00c853',
		},
	})
)

export const CreateGoogleDoc: React.FC<Props> = (props: Props) => {
	const theme = useTheme()
	const classes = useStyles(theme)
	const paragraphs = useSelector<AppState, Paragraph[]>(
		state => state.paragraphs.selected ?? []
	)

	const mapParasToText = (): string => {
		const top = CustomParagraphs.top
			.map(({ paragraph }) => paragraph)
			.join('\n\n')
		const middle = paragraphs.map(item => item.paragraph).join('\n\n')
		const bottom = CustomParagraphs.bottom
			.map(({ paragraph }) => paragraph)
			.join('\n\n')
		const text = top.concat(middle).concat(bottom)
		return text
	}

	const openInGoogleDoc = async () => {
		//const document = createGoogleDocument(paragraphs);
		const shareableLink = await callGoogleApi(mapParasToText())
		console.log('The response for the document is from google: ', shareableLink)
		window.open(shareableLink, '_blank')
	}

	return (
		<>
			<Button
				size="large"
				onClick={openInGoogleDoc}
				variant="outlined"
				className={classes.button}
			>
				View in Google Doc
			</Button>
		</>
	)
}

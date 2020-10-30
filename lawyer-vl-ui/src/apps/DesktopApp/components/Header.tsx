//@ts-nocheck

import React from 'react'
import { Card, CardContent, Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

type Props = {
	paragraph: string
	verticalHeight: string
	topic: string
}

const useStyles = makeStyles({
	root: {
		minWidth: 275,
		margin: 3,
		padding: 6,
		backgroundColor: '#eee',
	},
	cardcontent: {
		padding: 3,
	},
	subtext: {
		fontHeight: '0.6rem',
		color: 'red',
	},
})

export const Paragraph: React.FC<Props> = (props: Props) => {
	const classes = useStyles()
	const { paragraph, verticalHeight, topic } = props

	return (
		<Box className={classes.cardcontent}>
			<Typography variant="body2" component="p" style={{ textAlign: 'left' }}>
				{paragraph}
			</Typography>
			<div style={{ textAlign: 'right', fontSize: '8px' }}>
				{verticalHeight} {topic}
			</div>
		</Box>
	)
}

//@ts-nocheck

import React from 'react'
import { Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Paragraph } from './ParagraphComponent'
import { ParagraphTopics, Topics } from '../../../data/types'
import { useDispatch, useSelector } from 'react-redux'

type Props = {
	paragraph: Paragraph
}

const useStyles = makeStyles({
	root: {
		minWidth: 275,
		margin: 2,
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
	topicLabelSelected: {
		padding: '4px',
		marginLeft: '4px',
		background: 'green',
		color: 'white',
	},
	topicLabelNotSelected: {
		padding: '4px',
		marginLeft: '4px',
		background: 'gray',
		color: 'white',
	},
})

const findTopicLabel = identifier => {
	if (!identifier) return null
	const topic = Topics.find(t => t.id === identifier)
	if (!topic) return null
	return topic.text
}

export const ParagraphComponent: React.FC<Props> = (props: Props) => {
	const classes = useStyles()
	const { summary, paragraph, verticalHeight, topic } = props.paragraph
	const displayText = props.displayStyle === 'summary' ? summary : paragraph

	const selectedTopics = useSelector<AppState, Paragraph[]>(
		state => state.topics.selected
	)

	const selectedTopicIds = selectedTopics.map(t => t.id)

	const generateTopicsGraphic = (paragraph: Paragraph) => {
		const allTopics = paragraph.topicsOneOf.concat(paragraph.topicsAllOf)
		const topicList = allTopics.map(t => {
			const label = findTopicLabel(t)
			if (!label) return ''
			if (selectedTopicIds.includes(t)) {
				return <b className={classes.topicLabelSelected}>{label}</b>
			} else {
				return <b className={classes.topicLabelNotSelected}>{label}</b>
			}
		})
		return topicList
	}

	const topicsGraphic = generateTopicsGraphic(props.paragraph)

	return (
		<Box className={classes.cardcontent}>
			<Typography variant="body1" component="p" style={{ textAlign: 'left' }}>
				{displayText}
			</Typography>
			<Typography
				variant="caption"
				component="p"
				style={{ textAlign: 'left', padding: '1px' }}
			>
				<div style={{ textAlign: 'right', fontSize: '8px' }}>
					{topicsGraphic}
				</div>
			</Typography>
		</Box>
	)
}

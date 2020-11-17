//@ts-nocheck

import React, { useState } from 'react'
import {
	Typography,
	Box,
	Button,
	useTheme,
	Theme,
	createStyles,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import AppState from '../../../data/AppState'
import { ParagraphProperties } from 'docx'
import { ParagraphTopicMapping, ParagraphTopics } from '../../../data/types'
import { setTopics } from '../../../data/topicDataSlice'

type Props = {
	topicLabel: string
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		clicked: {
			margin: 3,
			width: '10rem',
			color: 'white',
			borderRadius: 15,
			borderColor: theme.palette.primary.main,
			backgroundColor: theme.palette.primary.main,
		},
		notClicked: {
			margin: 3,
			width: '10rem',
			borderRadius: 15,
			color: theme.palette.primary.main,
			borderColor: theme.palette.primary.main,
			backgroundColor: 'white',
		},
	})
)

export const FilterButton: React.FC<Props> = (props: Props) => {
	const theme = useTheme()
	const classes = useStyles(theme)
	const { topic, size = 'small' } = props

	const dispatch = useDispatch()
	const topics = useSelector<AppState>(state => state.topics.selected)
	const clicked = topics.map(t => t.id).includes(topic.id)

	const addTopic = () => {
		const updatedTopics = [...topics, topic]
		console.log('Updated topics to', updatedTopics)
		dispatch(setTopics(updatedTopics))
	}

	const removeTopic = () => {
		const updatedTopics = topics.filter(t => t.id !== topic.id)
		dispatch(setTopics(updatedTopics))
	}

	return (
		<>
			{!clicked && (
				<Button
					size={size}
					onClick={() => {
						addTopic()
					}}
					variant="outlined"
					className={classes.notClicked}
				>
					{topic.text}
				</Button>
			)}
			{clicked && (
				<Button
					size={size}
					onClick={() => {
						removeTopic()
					}}
					variant="contained"
					className={classes.clicked}
				>
					{topic.text}
				</Button>
			)}
		</>
	)
}

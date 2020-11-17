//@ts-nocheck

import React, { useEffect, useState } from 'react'
import { Grid, Theme, createStyles } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { FilterButton } from './FilterButton'
import { setTopics } from '../../../data/topicDataSlice'
import { ParagraphTopics, Topics } from '../../../data/types'
import { useSelector, useDispatch } from 'react-redux'
import AppState from '../../../data/AppState'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
		},
		heading: {
			fontSize: theme.typography.pxToRem(15),
			fontWeight: theme.typography.fontWeightBold,
		},
		button: {
			margin: 2,
			width: '10rem',
			color: 'white',
		},
		sectionHeader: {
			fontSize: '1.5em',
			textAlign: 'left',
			paddingLeft: '30px',
			marginTop: '30px',
		},
	})
)

const SubFilters = props => {
	const { topics } = props
	if (!topics || topics.length === 0) {
		return ''
	}

	return (
		<Grid item xs={6}>
			<div>Types of discrimination that affect me:</div>
			{topics.map(function (topic, idx) {
				return <FilterButton key={idx} topic={topic} />
			})}
		</Grid>
	)
}

export const Filter: React.FC<Props> = props => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const selectedTopics = useSelector<AppState>(state => state.topics.selected)

	const addTopic = (topic: string) => () => {
		const updatedTopics = [...selectedTopics, topic]
		dispatch(setTopics(updatedTopics))
	}

	const removeTopic = (topic: string) => () => {
		const updatedTopics = selectedTopics.filter(tpc => tpc !== topic)
		dispatch(setTopics(updatedTopics))
	}

	const employmentStatusTopics = Topics.filter(
		t => t.type === 'employment_situation'
	)
	const caseTopics = Topics.filter(t => t.type === 'case')
	let subCaseTopics = []
	if (selectedTopics.some(t => t.id === 'D')) {
		subCaseTopics = Topics.filter(t => t.type === 'subcase')
	}

	return (
		<>
			<Grid container spacing={1} className={classes.root}>
				<Grid item xs={12}>
					<div className={classes.sectionHeader}>Employment status</div>
				</Grid>
				<Grid item xs={6}>
					{employmentStatusTopics.map((topic, idx) => {
						return <FilterButton key={idx} size="small" topic={topic} />
					})}
				</Grid>
				<Grid item xs={12}>
					<div className={classes.sectionHeader}>Topics that affect me</div>
				</Grid>
				<Grid item xs={6}>
					{caseTopics.map((topic, idx) => {
						return <FilterButton key={idx} size="small" topic={topic} />
					})}
				</Grid>
				<SubFilters topics={subCaseTopics} />
			</Grid>
		</>
	)
}

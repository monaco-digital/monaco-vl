//@ts-nocheck

import React, { useEffect, useState } from 'react'
import {
	Typography,
	Box,
	Paper,
	TextField,
	Grid,
	Theme,
	createStyles,
	ButtonGroup,
	Button,
	styled,
	Divider,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { FilterButton } from './FilterButton'
import { getData } from '../../../api/vlmasersheet'
import { updateAll } from '../../../data/paragraphsDataSlice'
import { setTopics } from '../../../data/topicDataSlice'
import { ParagraphTopicMapping, ParagraphTopics } from '../../../data/types'
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
	const { display, addTopic, removeTopic } = props
	if (!display) {
		return ''
	}

	const subfilterList = [
		ParagraphTopics.PREGNANCY,
		ParagraphTopics.MATERNITY,
		ParagraphTopics.SEX,
		ParagraphTopics.SEXUALITY,
		ParagraphTopics.RACE,
		ParagraphTopics.RELIGION_BELIEF,
		ParagraphTopics.AGE,
		ParagraphTopics.DISABILITY,
		ParagraphTopics.MARRIAGE_CIVIL_PARTNERSHIP,
		ParagraphTopics.GENDER_REASSIGNMENT,
		ParagraphTopics.MENTAL_HEALTH_DISCRIMINATION,
		ParagraphTopics.POLITICAL_PHILOSOPHICAL,
	]

	return (
		<Grid item xs={6}>
			<div>Types of discrimination that affect me:</div>
			{subfilterList.map(function (label, idx) {
				return <FilterButton key={idx} topicLabel={label} />
			})}
		</Grid>
	)
}

export const Filter: React.FC<Props> = props => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const topics = useSelector<AppState>(state => state.topics.selected)

	const addTopic = (topic: string) => () => {
		const updatedTopics = [...topics, topic]
		dispatch(setTopics(updatedTopics))
	}

	const removeTopic = (topic: string) => () => {
		const updatedTopics = topics.filter(tpc => tpc !== topic)
		dispatch(setTopics(updatedTopics))
	}

	const employmentStatusTopics = [ParagraphTopics.EMPLOYED]
	const caseTopics = [
		ParagraphTopics.BULLYING,
		ParagraphTopics.DISMISSED,
		ParagraphTopics.REDUNDANCY,
		ParagraphTopics.PERFORMANCE,
		ParagraphTopics.CORONAVIRUS,
		ParagraphTopics.WHISTLEBLOWING,
		ParagraphTopics.HEALTH_SAFETY,
		ParagraphTopics.SICKNESS,
		ParagraphTopics.MONEY_OWED,
		ParagraphTopics.RESIGNED,
		ParagraphTopics.SUSPENSION,
		ParagraphTopics.MISCONDUCT,
		ParagraphTopics.FAILURE_TO_PROVIDE_PARTICULARS,
		ParagraphTopics.GRIEVANCE,
		ParagraphTopics.EQUAL_PAY,
		ParagraphTopics.DISCRIMINATION,
		ParagraphTopics.STAY_EMPLOYED,
	]

	return (
		<>
			<Grid container spacing={1} className={classes.root}>
				<Grid item xs={12}>
					<div className={classes.sectionHeader}>Employment status</div>
				</Grid>
				<Grid item xs={6}>
					{employmentStatusTopics.map((label, idx) => {
						return (
							<FilterButton key={idx} size="small" topicLabel={label}>
								{label}
							</FilterButton>
						)
					})}
				</Grid>
				<Grid item xs={12}>
					<div className={classes.sectionHeader}>Topics that affect me</div>
				</Grid>
				<Grid item xs={6}>
					{caseTopics.map((label, idx) => {
						return (
							<FilterButton key={idx} size="small" topicLabel={label}>
								{label}
							</FilterButton>
						)
					})}
				</Grid>
				<SubFilters
					display={topics.includes(ParagraphTopics.DISCRIMINATION)}
					addTopic={addTopic}
					removeTopic={removeTopic}
				/>
			</Grid>
		</>
	)
}

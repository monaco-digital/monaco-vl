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
import { ParagraphTopicMapping, ParagraphTopics } from '../../../data/types'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

type Props = {
	onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	onOrFilterChange: (topics: stringp[]) => void
	matches: number
}

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
	})
)

export const Filter: React.FC<Props> = (props: Props) => {
	const classes = useStyles()
	const { onFilterChange, onOrFilterChange, matches } = props
	const [topics, setTopics] = useState<string[]>([])
	const [filterExpanded, setFilterExpanded] = useState(true)

	const addTopic = (topic: string) => () => {
		const updatedTopics = [...topics, topic]
		setTopics(updatedTopics)
	}

	const removeTopic = (topic: string) => () => {
		const updatedTopics = topics.filter(tpc => tpc !== topic)
		setTopics(updatedTopics)
	}

	useEffect(() => {
		const mapToTopicList = topics.map(tpc => ParagraphTopicMapping[tpc])
		onOrFilterChange(mapToTopicList)
	}, [topics])

	const handleFilterToggle = () => {
		setFilterExpanded(prevValue => !prevValue)
	}

	return (
		<>
			<Grid item xs={12}>
				<div className={classes.root}>
					<Accordion expanded={filterExpanded} onChange={handleFilterToggle}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<Typography className={classes.heading}>Filters</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Grid container spacing={1} className={classes.root}>
								<Grid item xs={6}>
									{/* eslint-disable-next-line react/jsx-no-undef */}
									<FilterButton
										size="small"
										addTopic={addTopic(ParagraphTopics.EMPLOYED)}
										removeTopic={removeTopic(ParagraphTopics.EMPLOYED)}
									>
										Employed
									</FilterButton>
									<FilterButton
										size="small"
										addTopic={addTopic(ParagraphTopics.BULLYING)}
										removeTopic={removeTopic(ParagraphTopics.BULLYING)}
									>
										Bullying
									</FilterButton>
									<FilterButton
										size="small"
										addTopic={addTopic(ParagraphTopics.DISMISSED)}
										removeTopic={removeTopic(ParagraphTopics.DISMISSED)}
									>
										Dismissed
									</FilterButton>
									<FilterButton
										size="small"
										addTopic={addTopic(ParagraphTopics.REDUNDANCY)}
										removeTopic={removeTopic(ParagraphTopics.REDUNDANCY)}
									>
										Redundancy
									</FilterButton>
									<FilterButton
										size="small"
										addTopic={addTopic(ParagraphTopics.PERFORMANCE)}
										removeTopic={removeTopic(ParagraphTopics.PERFORMANCE)}
									>
										Performance
									</FilterButton>
									<FilterButton
										size="small"
										addTopic={addTopic(ParagraphTopics.CORONAVIRUS)}
										removeTopic={removeTopic(ParagraphTopics.CORONAVIRUS)}
									>
										Coronavirus
									</FilterButton>
									<FilterButton
										size="small"
										addTopic={addTopic(ParagraphTopics.WHISTLEBLOWING)}
										removeTopic={removeTopic(ParagraphTopics.WHISTLEBLOWING)}
									>
										Whistleblowing
									</FilterButton>
									<FilterButton
										size="small"
										addTopic={addTopic(ParagraphTopics.HEALTH_SAFETY)}
										removeTopic={removeTopic(ParagraphTopics.HEALTH_SAFETY)}
									>
										Health & Safety
									</FilterButton>
									<FilterButton
										size="small"
										addTopic={addTopic(ParagraphTopics.SICKNESS)}
										removeTopic={removeTopic(ParagraphTopics.SICKNESS)}
									>
										Sickness
									</FilterButton>
									<FilterButton
										size="small"
										addTopic={addTopic(ParagraphTopics.MONEY_OWED)}
										removeTopic={removeTopic(ParagraphTopics.MONEY_OWED)}
									>
										Money owed
									</FilterButton>
									<FilterButton
										size="small"
										addTopic={addTopic(ParagraphTopics.RESIGNED)}
										removeTopic={removeTopic(ParagraphTopics.RESIGNED)}
									>
										Resigned
									</FilterButton>
									<FilterButton
										size="small"
										addTopic={addTopic(ParagraphTopics.SUSPENSION)}
										removeTopic={removeTopic(ParagraphTopics.SUSPENSION)}
									>
										Suspension
									</FilterButton>
									<FilterButton
										size="small"
										addTopic={addTopic(ParagraphTopics.MISCONDUCT)}
										removeTopic={removeTopic(ParagraphTopics.MISCONDUCT)}
									>
										Misconduct
									</FilterButton>
									<FilterButton
										size="small"
										addTopic={addTopic(
											ParagraphTopics.FAILURE_TO_PROVIDE_PARTICULARS
										)}
										removeTopic={removeTopic(
											ParagraphTopics.FAILURE_TO_PROVIDE_PARTICULARS
										)}
									>
										FPP
									</FilterButton>
									<FilterButton
										size="small"
										addTopic={addTopic(ParagraphTopics.GRIEVANCE)}
										removeTopic={removeTopic(ParagraphTopics.GRIEVANCE)}
									>
										Grievance
									</FilterButton>
									<FilterButton
										size="small"
										addTopic={addTopic(ParagraphTopics.EQUAL_PAY)}
										removeTopic={removeTopic(ParagraphTopics.EQUAL_PAY)}
									>
										Equal Pay
									</FilterButton>
									<FilterButton
										size="small"
										addTopic={addTopic(ParagraphTopics.DISCRIMINATION)}
										removeTopic={removeTopic(ParagraphTopics.DISCRIMINATION)}
									>
										Discrimination
									</FilterButton>
									<FilterButton
										size="small"
										addTopic={addTopic(ParagraphTopics.STAY_EMPLOYED)}
										removeTopic={removeTopic(ParagraphTopics.STAY_EMPLOYED)}
									>
										Stay Employed
									</FilterButton>
								</Grid>
								<Grid item xs={6}>
									<FilterButton
										size="small"
										addTopic={addTopic(ParagraphTopics.PREGNANCY)}
										removeTopic={removeTopic(ParagraphTopics.PREGNANCY)}
									>
										Pregnancy
									</FilterButton>
									<FilterButton
										size="small"
										addTopic={addTopic(ParagraphTopics.MATERNITY)}
										removeTopic={removeTopic(ParagraphTopics.MATERNITY)}
									>
										Maternity
									</FilterButton>
									<FilterButton
										size="small"
										addTopic={addTopic(ParagraphTopics.SEX)}
										removeTopic={removeTopic(ParagraphTopics.SEX)}
									>
										Sex
									</FilterButton>
									<FilterButton
										size="small"
										addTopic={addTopic(ParagraphTopics.SEXUALITY)}
										removeTopic={removeTopic(ParagraphTopics.SEXUALITY)}
									>
										Sexuality
									</FilterButton>
									<FilterButton
										size="small"
										addTopic={addTopic(ParagraphTopics.RACE)}
										removeTopic={removeTopic(ParagraphTopics.RACE)}
									>
										Race
									</FilterButton>
									<FilterButton
										size="small"
										addTopic={addTopic(ParagraphTopics.RELIGION_BELIEF)}
										removeTopic={removeTopic(ParagraphTopics.RELIGION_BELIEF)}
									>
										Religion/Belief
									</FilterButton>
									<FilterButton
										size="small"
										addTopic={addTopic(ParagraphTopics.AGE)}
										removeTopic={removeTopic(ParagraphTopics.AGE)}
									>
										Age
									</FilterButton>
									<FilterButton
										size="small"
										addTopic={addTopic(ParagraphTopics.DISABILITY)}
										removeTopic={removeTopic(ParagraphTopics.DISABILITY)}
									>
										Disability
									</FilterButton>
									<FilterButton
										size="small"
										addTopic={addTopic(
											ParagraphTopics.MARRIAGE_CIVIL_PARTNERSHIP
										)}
										removeTopic={removeTopic(
											ParagraphTopics.MARRIAGE_CIVIL_PARTNERSHIP
										)}
									>
										Marriage
									</FilterButton>
									<FilterButton
										size="small"
										addTopic={addTopic(ParagraphTopics.GENDER_REASSIGNMENT)}
										removeTopic={removeTopic(
											ParagraphTopics.GENDER_REASSIGNMENT
										)}
									>
										GR
									</FilterButton>
									<FilterButton
										size="small"
										addTopic={addTopic(
											ParagraphTopics.MENTAL_HEALTH_DISCRIMINATION
										)}
										removeTopic={removeTopic(
											ParagraphTopics.MENTAL_HEALTH_DISCRIMINATION
										)}
									>
										Mental Health
									</FilterButton>
									<FilterButton
										size="small"
										addTopic={addTopic(ParagraphTopics.POLITICAL_PHILOSOPHICAL)}
										removeTopic={removeTopic(
											ParagraphTopics.POLITICAL_PHILOSOPHICAL
										)}
									>
										Philosophy/Belief
									</FilterButton>
								</Grid>
								<Grid item xs={12}>
									<Box display="flex" p={1} m={2} justifyContent="center">
										<FilterButton
											size="small"
											addTopic={addTopic(ParagraphTopics.ALL)}
											removeTopic={removeTopic(ParagraphTopics.ALL)}
										>
											All
										</FilterButton>
										<TextField
											id="topic-filter"
											label="Exact Topic Filter"
											type="search"
											variant="outlined"
											color="primary"
											onChange={onFilterChange}
										/>
									</Box>
								</Grid>
							</Grid>
						</AccordionDetails>
					</Accordion>
				</div>
			</Grid>
			<Grid item xs={12}>
				<Box display="flex" p={2} justifyContent="center">
					<Typography className={classes.heading} variant="h6">
						Matches: {matches}
					</Typography>
				</Box>
			</Grid>
		</>
	)
}

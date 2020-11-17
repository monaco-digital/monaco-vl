//@ts-nocheck
import React, { useEffect, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Paragraph } from './Paragraph'
import { Box, Grid, Tab, Tabs, Paper, Button } from '@material-ui/core'
import {
	convertParagraphsForEditor,
	getEData,
} from './editor/convertParagraphs'
import { SimpleEditor } from './editor/SimpleEditor'
import { LetterTop } from './letter/LetterTop'
import { LetterBottom } from './letter/LetterBottom'
import { CustomParagraphs } from '../../../data/static'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import { useDispatch, useSelector } from 'react-redux'
import { updateSelectedParagraphs } from '../../../data/paragraphsDataSlice'
import AppState from '../../../data/AppState'
import { getSuggestedParagraphs } from '../../../filters'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import { generateKeyPair } from 'crypto'

interface Props {
	paragraphs: Paragraph[]
}

// a little function to help us with reordering the result
const reorder = (list: any, startIndex: number, endIndex: number) => {
	const result = Array.from(list)
	const [removed] = result.splice(startIndex, 1)
	result.splice(endIndex, 0, removed)

	return result
}

/**
 * Moves an item from one list to another list.
 */
const move = (
	source: any,
	destination: any,
	droppableSource: any,
	droppableDestination: any
) => {
	const sourceClone = Array.from(source)
	const destClone = Array.from(destination)
	const [removed] = sourceClone.splice(droppableSource.index, 1)

	destClone.splice(droppableDestination.index, 0, removed)

	const result = {} as any
	result[droppableSource.droppableId] = sourceClone
	result[droppableDestination.droppableId] = destClone

	return result
}

interface TabPanelProps {
	children?: React.ReactNode
	index: any
	value: any
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box>{children}</Box>}
		</div>
	)
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		letterContainer: {
			padding: '10px',
			width: '94%',
			overflowY: 'scroll',
			background: '#eee',
			height: '85vh',
		},
		letterStyle: {
			border: '1px solid gray',
			margin: 'auto',
			padding: '10px',
			borderRadius: '5px',
			background: 'white',
			width: '94%',
			minHeight: window.innerHeight - 250,
		},
		heading: {
			fontSize: theme.typography.pxToRem(15),
			fontWeight: theme.typography.fontWeightBold,
		},
		button: {
			margin: 2,
			width: '10rem',
			color: 'black',
			background: theme.palette.secondary.light,
		},
		note: {
			color: 'gray',
			fontSize: '0.7em',
			marginBottom: '20px',
		},
		expandToggle: {
			display: 'flex',
			justifyContent: 'flex-end',
			color: 'blue',
		},
		fab: {
			position: 'absolute',
			bottom: theme.spacing(5),
			right: theme.spacing(14),
		},
		tooltip: {
			fontSize: '14px',
		},
	})
)

const grid = 8

const getItemStyle = (
	side: 'pList' | 'letter',
	isDragging,
	draggableStyle
) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: 'none',
	padding: side === 'pList' ? grid * 2 : grid * 1,
	margin: `0 0 ${side === 'pList' ? grid : grid / 2}px 0`,

	// change background colour if dragging
	background: isDragging ? 'lightblue' : 'white',

	// styles we need to apply on draggables
	...draggableStyle,
})

const getListStyle = isDraggingOver => ({
	borderRight: '1px solid gray',
	background: isDraggingOver ? '#bbb' : '#aaa',
	padding: '30px',
	width: '90%',
	height: '85vh',
	overflowY: 'scroll',
})

const getParagraphContentStyle = () => ({
	margin: 'auto',
	minHeight: '100%',
})

const getLetterContentStyle = isDraggingOver => ({
	padding: '4px',
	backgroundColor: isDraggingOver ? '#ccc' : '#efefef',
	minHeight: 250,
	paddingBottom: '40px',
})

export const LetterParagraph: React.FC<Props> = (props: Props) => {
	const classes = useStyles()
	const dispatch = useDispatch()

	const allParagraphs = useSelector<AppState, Paragraph[]>(
		state => state.paragraphs.all
	)

	const selectedTopics = useSelector<AppState, Paragraph[]>(
		state => state.topics.selected
	)

	const selectedParagraphs = useSelector<AppState, Paragraph[]>(
		state => state.paragraphs.selected
	)

	const suggestedParagraphs = getSuggestedParagraphs(
		allParagraphs,
		selectedTopics,
		selectedParagraphs
	)
	console.log('UPDATED SEGGGESTED PARGAPH', suggestedParagraphs)

	const [editorData, setEditorData] = useState<any>([])
	const [tabValue, setTabValue] = React.useState(0)

	//bottom paragraphs

	const handleChange = (event, newValue) => {
		setTabValue(newValue)
	}

	const onSelectedParagraphChange = (paragraphs: Paragraph[]): void => {
		//add paragraphs to the top and bottom of the letter
		const combinedParagraphs = [
			...CustomParagraphs.top,
			...paragraphs,
			...CustomParagraphs.bottom,
		]
		const eParagraphs = convertParagraphsForEditor(combinedParagraphs)
		const eData = getEData(eParagraphs)
		setEditorData(eData)
	}

	/* useEffect(() => {
		const selectedParagraphsIds = selectedParagraphs.map(
			paragraph => paragraph.id
		)
		//filter out already selcted paragraphs
		const uParagraphs = paragraphs.filter(
			({ id }) => !selectedParagraphsIds.includes(id)
		)
		setParagraphOptions(uParagraphs)
	}, [paragraphs]) */

	useEffect(() => {
		console.log(
			'Effect to call on select paragraphs change has been caleed with: ',
			selectedParagraphs
		)
		dispatch(updateSelectedParagraphs(selectedParagraphs))
	}, [selectedParagraphs])

	const getList = id => {
		if (id === 'paragraphList') {
			return suggestedParagraphs
		} else if (id === 'letterList') {
			return selectedParagraphs
		}
	}

	const onDragEnd = result => {
		const { source, destination } = result
		// dropped outside the list
		if (!destination) {
			return
		}
		if (source.droppableId === destination.droppableId) {
			const reordered = reorder(
				getList(source.droppableId),
				source.index,
				destination.index
			)

			if (source.droppableId === 'letterList') {
				dispatch(updateSelectedParagraphs(reordered))
			}
		} else {
			const updatedLists = move(
				getList(source.droppableId),
				getList(destination.droppableId),
				source,
				destination
			)
			dispatch(updateSelectedParagraphs(updatedLists.letterList))
		}
	}

	const [expanded, setExpanded] = useState(true)

	return (
		<>
			<Paper>
				<DragDropContext onDragEnd={onDragEnd}>
					<Grid container spacing={0} xs={12}>
						<Droppable droppableId="paragraphList">
							{(provided, snapshot) => (
								<Grid item xs={6} style={getListStyle(snapshot.isDraggingOver)}>
									<div
										style={getParagraphContentStyle()}
										ref={provided.innerRef}
									>
										{suggestedParagraphs?.map((item, index) => {
											return (
												<Draggable
													key={item.id}
													draggableId={item.id}
													index={index}
												>
													{(provided, snapshot) => (
														<div
															ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
															style={getItemStyle(
																'pList',
																snapshot.isDragging,
																provided.draggableProps.style
															)}
														>
															<Paragraph
																paragraph={item}
																displayStyle="summary"
															/>
														</div>
													)}
												</Draggable>
											)
										})}
										{provided.placeholder}
									</div>
								</Grid>
							)}
						</Droppable>
						<Grid item xs={6} className={classes.letterContainer}>
							<Box className={classes.letterStyle}>
								<div>
									<Collapse in={expanded} collapsedHeight={70}>
										{expanded && (
											<div className={classes.expandToggle}>
												<Button
													onClick={() => setExpanded(false)}
													size="small"
													variant="outlined"
													className={classes.button}
													endIcon={<ArrowUpwardIcon />}
												>
													hide&nbsp;boilerplate
												</Button>
											</div>
										)}
										{!expanded && (
											<div className={classes.expandToggle}>
												<Button
													onClick={() => setExpanded(true)}
													size="small"
													variant="outlined"
													className={classes.button}
													endIcon={<ArrowDownwardIcon />}
												>
													show&nbsp;boilerplate
												</Button>
											</div>
										)}
										<LetterTop />
									</Collapse>
									{!expanded && (
										<div className={classes.note}>expand to see more</div>
									)}
								</div>
								<Droppable droppableId="letterList">
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											style={getLetterContentStyle(snapshot.isDraggingOver)}
										>
											{selectedParagraphs.length === 0 &&
												`[Note to user - drag and drop paragraphs here]`}
											{selectedParagraphs?.map((item, index) => (
												<Draggable
													key={item.id}
													draggableId={item.id}
													index={index}
												>
													{(provided, snapshot) => (
														<div
															ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
															style={getItemStyle(
																'letter',
																snapshot.isDragging,
																provided.draggableProps.style
															)}
														>
															<Paragraph
																paragraph={item}
																displayStyle="summary"
															/>
														</div>
													)}
												</Draggable>
											))}
											{provided.placeholder}
										</div>
									)}
								</Droppable>
								<div>
									<br />
									<Collapse in={expanded} collapsedHeight={70}>
										<LetterBottom />
									</Collapse>
									{!expanded && (
										<div className={classes.note}>expand to see more</div>
									)}
								</div>
							</Box>
						</Grid>
					</Grid>
				</DragDropContext>
			</Paper>
		</>
	)
}

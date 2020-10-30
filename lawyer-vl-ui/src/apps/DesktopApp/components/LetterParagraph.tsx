//@ts-nocheck
import React, { useEffect, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Paragraph } from './Paragraph'
import { Box, Grid, Button } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { RSA_PSS_SALTLEN_AUTO } from 'constants'

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
	})
)

const grid = 8

const getItemStyle = (isDragging, draggableStyle) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: 'none',
	padding: grid * 2,
	margin: `0 0 ${grid}px 0`,

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

const getLetterContentStyle = isDraggingOver => ({
	padding: '4px',
	backgroundColor: isDraggingOver ? '#ccc' : '#efefef',
	minHeight: 250,
	paddingBottom: '40px',
})

export const LetterParagraph: React.FC<Props> = (props: Props) => {
	const classes = useStyles()

	const { paragraphs } = props

	const [paragraphOptions, setParagraphOptions] = useState(paragraphs ?? [])
	const [selectedParagraphs, setSelectedParagraphs] = useState([])

	useEffect(() => {
		const selectedParagraphsIds = selectedParagraphs.map(
			paragraph => paragraph.id
		)
		//filter out already selcted paragraphs
		const uParagraphs = paragraphs.filter(
			({ id }) => !selectedParagraphsIds.includes(id)
		)
		setParagraphOptions(uParagraphs)
	}, [paragraphs])

	console.log('the paragraphs in Letter paragraphs are: ', paragraphOptions)

	const copyParasToText = () => {
		const x = selectedParagraphs.map(item => item.paragraph).join('\n\n')
		navigator.clipboard.writeText(x)
	}

	const getList = id => {
		if (id === 'paragraphList') {
			return paragraphOptions
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
				setSelectedParagraphs(reordered)
			}
		} else {
			const updatedLists = move(
				getList(source.droppableId),
				getList(destination.droppableId),
				source,
				destination
			)
			setParagraphOptions(updatedLists.paragraphList)
			setSelectedParagraphs(updatedLists.letterList)
		}
	}

	return (
		<>
			<DragDropContext onDragEnd={onDragEnd}>
				<Grid container spacing={0} xs={12}>
					<Droppable droppableId="paragraphList">
						{(provided, snapshot) => (
							<Grid item xs={6} style={getListStyle(snapshot.isDraggingOver)}>
								<div style={{ margin: 'auto' }} ref={provided.innerRef}>
									{paragraphOptions?.map((item, index) => {
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
															snapshot.isDragging,
															provided.draggableProps.style
														)}
													>
														<Paragraph
															paragraph={item.paragraph}
															verticalHeight={item.verticalHeight}
															topic={item.topic}
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
								<div style={{ textAlign: 'right', marginBottom: '10px' }}>
									[Address]
								</div>
								<div style={{ textAlign: 'left', marginBottom: '10px' }}>
									[Address]
								</div>
								<div
									style={{
										textAlign: 'left',
										marginBottom: '10px',
										fontWeight: 'bold',
									}}
								>
									Without prejudice
								</div>
							</div>
							<Droppable droppableId="letterList">
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										style={getLetterContentStyle(snapshot.isDraggingOver)}
									>
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
															snapshot.isDragging,
															provided.draggableProps.style
														)}
													>
														<Paragraph
															paragraph={item.paragraph}
															verticalHeight={item.verticalHeight}
															topic={item.topic}
														/>
													</div>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						</Box>
						<Box style={{ marginTop: '10px' }}>
							<Button
								variant="contained"
								color="primary"
								onClick={() => {
									copyParasToText()
								}}
							>
								Copy text
							</Button>
						</Box>
					</Grid>
				</Grid>
			</DragDropContext>
		</>
	)
}

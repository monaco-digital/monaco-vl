import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import Paragraph from '../../common/Paragraph'
import { Paragraph as ParagraphT } from '../../../../data/types'
import Title from '../../Title'
import { reorderParagraphs } from '../../../../data/paragraphsDataSlice'
import AppState from '../../../../data/AppState'

const ParagraphsEditMode: React.FC = () => {
	const selectedParagraphs = useSelector<AppState, ParagraphT[]>(
		state => state.paragraphs.selected
	)
	const dispatch = useDispatch()

	return (
		<>
			<Title
				text={{
					heading: 'Letter builder',
					subHeading: 'Reorder or delete paragraphs.',
				}}
			/>
			<div className="paragraphs-edit-mode">
				<DragDropContext
					onDragEnd={dragEvent => dispatch(reorderParagraphs({ dragEvent }))}
				>
					<Droppable droppableId="selected">
						{provided => (
							<div
								ref={provided.innerRef}
								{...provided.droppableProps}
								className="paragraphs"
							>
								<div className="container">
									{selectedParagraphs.map((paragraph, i) => (
										<Draggable
											draggableId={paragraph.id}
											index={i}
											key={paragraph.id}
										>
											{provided => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
												>
													<Paragraph paragraphData={paragraph} />
												</div>
											)}
										</Draggable>
									))}
								</div>
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</div>
		</>
	)
}

export default ParagraphsEditMode

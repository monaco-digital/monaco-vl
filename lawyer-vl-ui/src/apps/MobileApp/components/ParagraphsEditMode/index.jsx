import React, { useContext } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import Paragraph from '../Paragraph'
import ScreenContext from '../../context'
import actionType from '../../state/actionType'
import Title from '../Title'

const ParagraphsEditMode = () => {
	const { state, dispatch } = useContext(ScreenContext)
	const { selectedParagraphs } = state
	const reorderParagraphs = dragEvent => {
		dispatch({
			type: actionType.REORDER_PARAGRAPHS,
			payload: { value: dragEvent },
		})
	}

	return (
		<>
			<Title
				text={{
					heading: 'Letter builder',
					subHeading: 'Reorder or delete paragraphs.',
				}}
			/>
			<div className="paragraphs-edit-mode">
				<DragDropContext onDragEnd={reorderParagraphs}>
					<Droppable droppableId="paragraphs">
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
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</div>
		</>
	)
}

export default ParagraphsEditMode

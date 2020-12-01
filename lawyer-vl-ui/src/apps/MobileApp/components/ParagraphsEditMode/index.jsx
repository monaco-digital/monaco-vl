import React from 'react'
import { connect } from 'react-redux'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import Paragraph from '../Paragraph'
import Title from '../Title'
import { reorderParagraphs } from '../../../../data/paragraphsDataSlice'

const ParagraphsEditMode = ({ selectedParagraphs, reorderParagraphs }) => {
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

const mapStateToProps = state => {
	const { paragraphs } = state
	return {
		selectedParagraphs: paragraphs.selected,
	}
}

const mapDispatchToProps = {
	reorderParagraphs,
}

export default connect(mapStateToProps, mapDispatchToProps)(ParagraphsEditMode)

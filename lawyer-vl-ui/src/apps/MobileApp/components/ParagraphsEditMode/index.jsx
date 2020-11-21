import React, { useContext } from 'react'
import classNames from 'classnames'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import Paragraph from '../Paragraph'
import ScreenContext from '../../context'
import actionType from '../../state/actionType'
import Title from '../Title'

const ParagraphsEditMode = () => {
	const { state, dispatch } = useContext(ScreenContext)
	const { modeModifier, suggestedParagraphs } = state
	const toggleReorderMode = () => {
		const toggleModeModifier =
			modeModifier === 'PARAGRAPHS_REORDER'
				? 'PARAGRAPHS_EDIT'
				: 'PARAGRAPHS_REORDER'
		dispatch({
			type: actionType.SET_MODE_MODIFIER,
			payload: { modeModifier: toggleModeModifier },
		})
	}
	const toggleDeleteMode = () => {
		const toggleModeModifier =
			modeModifier === 'PARAGRAPHS_DELETION'
				? 'PARAGRAPHS_EDIT'
				: 'PARAGRAPHS_DELETION'
		dispatch({
			type: actionType.SET_MODE_MODIFIER,
			payload: { modeModifier: toggleModeModifier },
		})
	}
	const paragraphsClasses = classNames('paragraphs', {
		'paragraphs-edit-mode--delete': modeModifier === 'PARAGRAPHS_DELETION',
		'paragraphs-edit-mode--reorder': modeModifier === 'PARAGRAPHS_REORDER',
	})
	const reorderParagraphs = dragEvent => {
		dispatch({
			type: actionType.REORDER_PARAGRAPHS,
			payload: { value: dragEvent },
		})
	}

	return (
		<>
			<Title text={{ heading: 'Letter builder - Editing' }} />
			<div className="paragraphs-edit-mode">
				<DragDropContext onDragEnd={reorderParagraphs}>
					<Droppable droppableId="paragraphs">
						{provided => (
							<div
								ref={provided.innerRef}
								{...provided.droppableProps}
								className={paragraphsClasses}
							>
								<div className="container">
									{suggestedParagraphs.map((paragraph, i) => (
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

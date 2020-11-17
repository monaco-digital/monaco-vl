import React, { useContext } from 'react'
import classNames from 'classnames'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import Paragraph from '../Paragraph'
import ScreenContext from '../../context'
import Button from '../Button'

const ParagraphsEditMode = () => {
	const { state, dispatch } = useContext(ScreenContext)
	const { modeModifier, activeParagraphs } = state
	const toggleReorderMode = () => {
		const toggleModeModifier =
			modeModifier === 'PARAGRAPHS_REORDER'
				? 'PARAGRAPHS_EDIT'
				: 'PARAGRAPHS_REORDER'
		dispatch({
			type: 'SET_MODE_MODIFIER',
			payload: { modeModifier: toggleModeModifier },
		})
	}
	const toggleDeleteMode = () => {
		const toggleModeModifier =
			modeModifier === 'PARAGRAPHS_DELETION'
				? 'PARAGRAPHS_EDIT'
				: 'PARAGRAPHS_DELETION'
		dispatch({
			type: 'SET_MODE_MODIFIER',
			payload: { modeModifier: toggleModeModifier },
		})
	}
	const paragraphsClasses = classNames('paragraphs', {
		'paragraphs-edit-mode--delete': modeModifier === 'PARAGRAPHS_DELETION',
		'paragraphs-edit-mode--reorder': modeModifier === 'PARAGRAPHS_REORDER',
	})
	const reorderParagraphs = dragEvent => {
		dispatch({ type: 'REORDER_PARAGRAPHS', payload: { value: dragEvent } })
	}

	return (
		<div className="paragraphs-edit-mode">
			<div className="paragraphs-edit-mode__actions">
				<Button type="secondary" text="Reoder" fn={() => toggleReorderMode()} />
				<Button type="danger" text="Delete" fn={() => toggleDeleteMode()} />
			</div>
			{modeModifier === 'PARAGRAPHS_REORDER' ? (
				// Display drag and droppable paragraphs
				<DragDropContext onDragEnd={reorderParagraphs}>
					<Droppable droppableId="paragraphs">
						{provided => (
							<div
								ref={provided.innerRef}
								{...provided.droppableProps}
								className={paragraphsClasses}
							>
								{activeParagraphs.map((paragraphText, i) => (
									<Draggable draggableId={`paragraph-${i}`} index={i} key={i}>
										{provided => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
											>
												<Paragraph paragraphText={paragraphText} />
											</div>
										)}
									</Draggable>
								))}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			) : (
				// Display normal paragraphs
				activeParagraphs.map((paragraphText, i) => (
					<div key={`paragraph-${i}`}>
						<Paragraph paragraphText={paragraphText} />
					</div>
				))
			)}
		</div>
	)
}

export default ParagraphsEditMode

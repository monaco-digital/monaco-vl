import React, { useContext } from 'react'
import classNames from 'classnames'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import Paragraph from '../Paragraph'
import ScreenContext from '../../context'
import Button from '../Button'

const ParagraphsEditMode = () => {
	const {
		activeParagraphs,
		setActiveParagraphs,
		startParagraphsDeleteMode,
		setStartParagraphReorderMode,
		startParagraphsReorderMode,
		setStartParagraphDeleteMode,
	} = useContext(ScreenContext)
	const toggleReorderMode = () => {
		setStartParagraphDeleteMode(false)
		setStartParagraphReorderMode(!startParagraphsReorderMode)
	}
	const toggleDeleteMode = () => {
		setStartParagraphReorderMode(false)
		setStartParagraphDeleteMode(!startParagraphsDeleteMode)
	}
	const paragraphsClasses = classNames('paragraphs', {
		'paragraphs-edit-mode--delete': startParagraphsDeleteMode,
		'paragraphs-edit-mode--reorder': startParagraphsReorderMode,
	})
	const reorderParagraphs = ({ source, destination }) => {
		const { index: sourceIndex } = source
		const { index: destinationIndex } = destination
		const tempActiveParagraphs = [...activeParagraphs]
		const [removed] = tempActiveParagraphs.splice(sourceIndex, 1)
		tempActiveParagraphs.splice(destinationIndex, 0, removed)

		setActiveParagraphs(tempActiveParagraphs)
	}

	return (
		<div className="paragraphs-edit-mode">
			<div className="paragraphs-edit-mode__actions">
				<Button type="secondary" text="Reoder" fn={() => toggleReorderMode()} />
				<Button type="danger" text="Delete" fn={() => toggleDeleteMode()} />
			</div>
			{startParagraphsReorderMode ? (
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

import React, { FC, ReactNode, useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import classNames from 'classnames'
import Title from '../../Title'
import Paragraph from '../../common/Paragraph'
import {
	removeParagraph,
	addParagraph,
	reorderParagraphs,
} from '../../../../data/paragraphsDataSlice'
import { useDispatch, useSelector } from 'react-redux'
import AppState from '../../../../data/AppState'
import { CaseTopic, Paragraph as ParagraphT } from '../../../../data/types'
import VLcard from '../../common/VLcard'
import LetterPreviewParagraph from '../../common/LetterPreviewParagraph'
import { getLetterText } from '../../../../utlis/letter'

const ParagraphsPreview: FC = () => {
	const suggestedParagraphs = useSelector<AppState, ParagraphT[]>(
		state => state.paragraphs.suggested
	)
	const selectedParagraphs = useSelector<AppState, ParagraphT[]>(
		state => state.paragraphs.selected
	)
	const selectedTopics = useSelector<AppState, CaseTopic[]>(
		state => state.topics.selected
	)
	const [
		suggestedParagraphsMinusSelected,
		setSuggestedParagraphsMinusSelected,
	] = useState([])
	const dispatch = useDispatch()
	const [isDragging, setIsDraggin] = useState(false)
	const { top, bottom } = getLetterText(selectedTopics, selectedParagraphs)

	useEffect(() => {
		const selectedParagraphsIds = selectedParagraphs.map(({ id }) => id)
		const filteredSuggestedParagraphs = suggestedParagraphs.filter(
			paragraph => !selectedParagraphsIds.includes(paragraph.id)
		)

		setSuggestedParagraphsMinusSelected(filteredSuggestedParagraphs)
	}, [selectedParagraphs])

	const handleDragStart = () => {
		setIsDraggin(true)
	}
	const handleDragEnd = dragEvent => {
		setIsDraggin(false)

		const { source, destination, draggableId } = dragEvent
		const destinationExists = destination
		const isFromSuggested = source.droppableId === 'suggested'
		const isFromSelected = source.droppableId === 'selected'
		const sourceId = source.droppableId

		// Make sure we are dragging into a <Droppable>
		if (destinationExists) {
			const destinationId = destination.droppableId
			const isMultilist = sourceId !== destinationId

			// Check if dragging between lists
			if (isMultilist) {
				if (isFromSuggested) {
					dispatch(addParagraph({ id: draggableId, toId: destinationId }))
					dispatch(
						reorderParagraphs({
							dragEvent,
						})
					)
				}
				if (isFromSelected) {
					dispatch(removeParagraph({ id: draggableId, fromId: sourceId }))
				}
				// Handle reordering within the same list
			} else {
				dispatch(
					reorderParagraphs({
						dragEvent,
					})
				)
			}
		}

		// Remove from selected if dragging away from it
		if (!destinationExists && isFromSelected) {
			dispatch(removeParagraph({ id: draggableId, fromId: sourceId }))
		}
	}
	const paragraphsPreviewLetterDropzoneClasses = classNames(
		'paragraphs-preview__letter__dropzone__message',
		{
			'paragraphs-preview__letter__dropzone__message--is-dragging': isDragging,
		}
	)

	return (
		<>
			<Title
				text={{
					heading: 'Build your letter',
					subHeading: 'Select paragraphs by tapping on them.',
				}}
			/>
			<DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
				<div className="paragraphs-preview paragraphs-preview--desktop">
					<div className="paragraphs-preview__select">
						<div className="paragraphs-preview__select__wrapper">
							<VLcard
								heading="Select paragraphs"
								counter={suggestedParagraphsMinusSelected.length}
							>
								<div className="paragraphs-preview__select-paragraphs">
									<Droppable droppableId="suggested">
										{(provided, snapshot) => (
											<div ref={provided.innerRef}>
												{suggestedParagraphsMinusSelected.map(
													(paragraph, i) => (
														<Draggable
															key={paragraph.id}
															draggableId={paragraph.id}
															index={i}
														>
															{(provided, snapshot) => (
																<div
																	ref={provided.innerRef}
																	{...provided.draggableProps}
																	{...provided.dragHandleProps}
																>
																	<Paragraph
																		key={paragraph.id}
																		paragraphData={paragraph}
																	/>
																	{provided.placeholder}
																</div>
															)}
														</Draggable>
													)
												)}
												{provided.placeholder}
											</div>
										)}
									</Droppable>
								</div>
							</VLcard>
						</div>
					</div>
					<div className="paragraphs-preview__letter">
						<div className="paragraphs-preview__letter__wrapper">
							<VLcard
								heading="Draft letter"
								counter={selectedParagraphs.length}
								theme="light"
							>
								<div className="paragraphs-preview__letter-boxes">
									<ParagraphsPreviewBox collapsedText="Introduction">
										<LetterPreviewParagraph paragraphs={top} />
									</ParagraphsPreviewBox>
									<Droppable droppableId="selected">
										{(provided, snapshot) => (
											<div
												className="paragraphs-preview__letter-box paragraphs-preview__letter__dropzone"
												ref={provided.innerRef}
											>
												{!selectedParagraphs.length ? (
													<div
														className={paragraphsPreviewLetterDropzoneClasses}
													>
														<i className="fas fa-info-circle"></i>
														<span>Drag paragraphs here</span>
													</div>
												) : (
													selectedParagraphs.map((paragraph, i) => {
														return (
															<Draggable
																key={paragraph.id}
																draggableId={paragraph.id}
																index={i}
															>
																{(provided, snapshot) => (
																	<div
																		ref={provided.innerRef}
																		{...provided.draggableProps}
																		{...provided.dragHandleProps}
																	>
																		<Paragraph
																			key={paragraph.id}
																			paragraphData={paragraph}
																		/>
																	</div>
																)}
															</Draggable>
														)
													})
												)}
												{provided.placeholder}
											</div>
										)}
									</Droppable>
									<ParagraphsPreviewBox collapsedText="Signature">
										<LetterPreviewParagraph paragraphs={bottom} />
									</ParagraphsPreviewBox>
								</div>
							</VLcard>
						</div>
					</div>
				</div>
			</DragDropContext>
		</>
	)
}

type ParagraphsPreviewBox = {
	children: ReactNode
	collapsedText?: string
}

const ParagraphsPreviewBox: FC<ParagraphsPreviewBox> = ({
	children,
	collapsedText,
}) => {
	const [isCollapsed, setIsCollapsed] = useState(true)
	const chevronClasses = classNames('fas', {
		'fa-chevron-up': isCollapsed,
		'fa-chevron-down': !isCollapsed,
	})
	const handleClick = () => {
		setIsCollapsed(isCollapsed => !isCollapsed)
	}

	return (
		<div className="paragraphs-preview__letter-box">
			<button
				className="paragraphs-preview__letter-box__chevron"
				onClick={handleClick}
			>
				<i className={chevronClasses} />
			</button>
			{isCollapsed ? collapsedText : children}
		</div>
	)
}

export default ParagraphsPreview

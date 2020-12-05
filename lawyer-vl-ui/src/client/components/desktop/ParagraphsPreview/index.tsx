import React, { FC, ReactNode, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import classNames from 'classnames'
import Title from '../../Title'
import Paragraph from '../../common/Paragraph'
import introParagraph from '../../../data/introParagraph'
import {
	toggleSelectedParagraph,
	removeSelectedParagraph,
} from '../../../../data/paragraphsDataSlice'
import { useDispatch, useSelector } from 'react-redux'
import AppState from '../../../../data/AppState'
import { Paragraph as ParagraphT } from '../../../../data/types'
import expandTextIcon from '../../../assets/img/expand-text-icon.svg'

const ParagraphsPreview: FC = () => {
	const suggestedParagraphs = useSelector<AppState, ParagraphT[]>(
		state => state.paragraphs.suggested
	)
	const selectedParagraphs = useSelector<AppState, ParagraphT[]>(
		state => state.paragraphs.selected
	)
	const dispatch = useDispatch()
	const [isDragging, setIsDraggin] = useState(false)
	const handleDragStart = () => {
		setIsDraggin(true)
	}
	const handleDragEnd = dragEvent => {
		console.log({ dragEvent })
		setIsDraggin(false)
		const { source, destination, draggableId } = dragEvent
		const destinationExists = destination

		if (destinationExists) {
			const sourceId = source.droppableId
			const destinationId = destination.droppableId
			const isSelfDropping = sourceId === destinationId
			dispatch(toggleSelectedParagraph(draggableId))

			if (isSelfDropping) return
		}
	}
	const paragraphsPreviewLetterDropzoneClasses = classNames(
		'paragraphs-preview__letter-dropzone',
		{
			'paragraphs-preview__letter-dropzone--is-dragging': isDragging,
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
							<div className="paragraphs-preview__header">
								<span>Select paragraphs</span>
								<ParagraphsPreviewCounter selected={suggestedParagraphs} />
							</div>
							<div className="paragraphs-preview__select-paragraphs">
								<Paragraph paragraphData={introParagraph as ParagraphT} />
								{suggestedParagraphs.map((paragraph, i) => (
									<Droppable
										key={paragraph.id}
										droppableId="paragraphs-preview__letter-select"
									>
										{(provided, snapshot) => (
											<div ref={provided.innerRef}>
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
																isDesktop
															/>
														</div>
													)}
												</Draggable>
												{provided.placeholder}
											</div>
										)}
									</Droppable>
								))}
							</div>
						</div>
					</div>
					<div className="paragraphs-preview__letter">
						<div className="paragraphs-preview__letter__wrapper">
							<div className="paragraphs-preview__header">
								<span>Draft letter</span>
								<ParagraphsPreviewCounter selected={selectedParagraphs} />
							</div>
							<div className="paragraphs-preview__letter-boxes">
								<ParagraphsPreviewBox extraClasses="paragraphs-preview__letter-intro">
									<ParagraphsPreviewBoxCollapsable
										paragraph="Letter introduction and address Letter introduction and address Letter introduction and address"
										summary="Letter introduction and address"
									/>
								</ParagraphsPreviewBox>
								<Droppable droppableId="paragraphs-preview__letter-dropzone">
									{(provided, snapshot) => (
										<div
											className="paragraphs-preview__letter-box"
											ref={provided.innerRef}
										>
											{!selectedParagraphs.length ? (
												<div className={paragraphsPreviewLetterDropzoneClasses}>
													<div className="paragraphs-preview__letter-dropzone-message">
														<i className="fas fa-info-circle"></i>
														<span>Drag paragraphs here</span>
													</div>
												</div>
											) : (
												selectedParagraphs.map((paragraph, i) => {
													return (
														<Paragraph
															key={paragraph.id}
															paragraphData={paragraph}
															isDesktop
														/>
													)
												})
											)}
											{provided.placeholder}
										</div>
									)}
								</Droppable>
								<ParagraphsPreviewBox extraClasses="paragraphs-preview__letter-outro">
									<ParagraphsPreviewBoxCollapsable
										paragraph="Signature Signature Signature Signature Signature Signature"
										summary="Signature"
									/>
								</ParagraphsPreviewBox>
							</div>
						</div>
					</div>
				</div>
			</DragDropContext>
		</>
	)
}

type ParagraphsPreviewBox = {
	children: ReactNode
	extraClasses?: string
}

const ParagraphsPreviewBox: FC<ParagraphsPreviewBox> = ({
	children,
	extraClasses,
}) => {
	const ParagraphsPreviewBoxClasses = classNames(
		`paragraphs-preview__letter-box ${extraClasses}`
	)

	return <div className={ParagraphsPreviewBoxClasses}>{children}</div>
}

type ParagraphsPreviewBoxCollapsable = {
	paragraph: string
	summary: string
}

const ParagraphsPreviewBoxCollapsable: FC<ParagraphsPreviewBoxCollapsable> = ({
	paragraph,
	summary,
}) => {
	const [collapsed, setCollapsed] = useState(true)
	const handleOnClick = () => {
		setCollapsed(collapsed => !collapsed)
	}
	const chevronClasses = classNames('fas', {
		'fa-chevron-down': collapsed,
		'fa-chevron-up': !collapsed,
	})

	return (
		<div
			onClick={handleOnClick}
			className="paragraphs-preview__letter-box--collapsible"
		>
			<span className="paragraphs-preview__letter-box__text">
				{!collapsed ? paragraph : summary}
			</span>
			<span className="paragraphs-preview__letter-box__chevron">
				<i className={chevronClasses}></i>
			</span>
		</div>
	)
}

type ParagraphsPreviewCounter = {
	selected: ParagraphT[]
}

const ParagraphsPreviewCounter: FC<ParagraphsPreviewCounter> = ({
	selected,
}) => {
	return (
		<span className="paragraphs-preview__header__counter">
			<img src={expandTextIcon} />
			<span className="paragraphs-preview__header__counter-number">
				{selected.length}
			</span>
		</span>
	)
}

export default ParagraphsPreview

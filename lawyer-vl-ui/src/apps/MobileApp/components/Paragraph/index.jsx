import React, { useContext, forwardRef } from 'react'
import classNames from 'classnames'
import ScreenContext from '../../context'
import Button from '../Button'

const Paragraph = ({ paragraphText }) => {
	const {
		activeParagraphs,
		setActiveParagraphs,
		startParagraphsEditMode,
		startParagraphsDeleteMode,
		startParagraphsReorderMode,
	} = useContext(ScreenContext)
	const handleOnClick = () => {
		// avoid direct dlicks in the paragraphs during edit mode
		if (startParagraphsEditMode) {
			return
		}

		setActiveParagraphs(paragraphs => {
			const isAlreadyActive = paragraphs.includes(paragraphText)

			if (isAlreadyActive) {
				return paragraphs.filter(value => value !== paragraphText)
			} else {
				return [...paragraphs, paragraphText]
			}
		})
	}
	const deleteParagraph = () => {
		setActiveParagraphs(paragraphs => {
			return paragraphs.filter(value => value !== paragraphText)
		})
	}
	const reorderParagraph = () => {}
	const paragraphClasses = classNames('paragraph', {
		'paragraph--reorder': startParagraphsReorderMode,
		'paragraph--active':
			!startParagraphsEditMode &&
			activeParagraphs.find(value => value === paragraphText),
	})

	return (
		<div className={paragraphClasses}>
			<button className="paragraph__box" onClick={() => handleOnClick()}>
				<span className="paragraph__text">
					{startParagraphsReorderMode && (
						<i className="paragraph__draghandle fas fa-ellipsis-v"></i>
					)}
					{paragraphText}
				</span>
			</button>
			{startParagraphsDeleteMode && (
				<button onClick={() => deleteParagraph()}>
					<i class="paragraph__delete fas fa-minus-circle"></i>
				</button>
			)}
		</div>
	)
}

export default Paragraph

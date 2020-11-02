import React, { useContext } from 'react'
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
	const classes = classNames('paragraph__text', {
		'paragraph__text--active':
			!startParagraphsEditMode &&
			activeParagraphs.find(value => value === paragraphText),
	})

	return (
		<div className="paragraph">
			{startParagraphsReorderMode && (
				<Button
					type="secondary"
					text="="
					extraClasses="paragraph__reorder"
					fn={() => reorderParagraph()}
				/>
			)}
			<button className="paragraph__box" onClick={() => handleOnClick()}>
				<span className={classes}>{paragraphText}</span>
			</button>
			{startParagraphsDeleteMode && (
				<Button
					type="danger"
					text="x"
					extraClasses="paragraph__delete"
					fn={() => deleteParagraph()}
				/>
			)}
		</div>
	)
}

export default Paragraph

import React, { useContext } from 'react'
import classNames from 'classnames'
import Paragraph from '../Paragraph'
import ScreenContext from '../../context'
import Button from '../Button'

const ParagraphsEditMode = () => {
	const {
		activeParagraphs,
		startParagraphsDeleteMode,
		setStartParagraphReorderMode,
		startParagraphsReorderMode,
		setStartParagraphDeleteMode,
	} = useContext(ScreenContext)
	const toggleReorderMode = () => {
		setStartParagraphReorderMode(!startParagraphsReorderMode)
	}
	const toggleDeleteMode = () => {
		setStartParagraphDeleteMode(!startParagraphsDeleteMode)
	}
	const paragraphsClasses = classNames('paragraphs', {
		'paragraphs-edit-mode--delete': startParagraphsDeleteMode,
		'paragraphs-edit-mode--reorder': startParagraphsReorderMode,
	})

	return (
		<div className="paragraphs-edit-mode">
			<div className="paragraphs-edit-mode__actions">
				<Button type="secondary" text="Reoder" fn={() => toggleReorderMode()} />
				<Button type="danger" text="Delete" fn={() => toggleDeleteMode()} />
			</div>
			<div className={paragraphsClasses}>
				{activeParagraphs.map((paragraphText, i) => (
					<Paragraph
						key={`${paragraphText}-${i}`}
						paragraphText={paragraphText}
					/>
				))}
			</div>
		</div>
	)
}

export default ParagraphsEditMode

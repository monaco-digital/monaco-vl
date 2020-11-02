import React, { useContext } from 'react'
import classNames from 'classnames'
import Paragraph from '../Paragraph'
import ScreenContext from '../../context'
import Button from '../Button'

const ParagraphsEditMode = () => {
	const {
		activeParagraphs,
		startParagraphDeleteMode,
		setStartParagraphReorderMode,
		startParagraphReorderMode,
		setStartParagraphDeleteMode,
	} = useContext(ScreenContext)
	const toggleReorderMode = () => {
		setStartParagraphReorderMode(true)
	}
	const toggleDeleteMode = () => {
		setStartParagraphDeleteMode(!startParagraphDeleteMode)
	}
	const paragraphsClasses = classNames('paragraphs', {
		'paragraphs-edit-mode--delete': startParagraphDeleteMode,
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

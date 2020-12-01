import React from 'react'
import { saveAs } from 'file-saver'
import Button from '../Button'
import createLetterDocx from '../../utils/createLetterDocx.js'
import modes from '../../state/modes'
import moreInfoIcon from './../../assets/img/more-info-icon.svg'
import dragIcon from './../../assets/img/drag-icon.svg'
import { connect } from 'react-redux'
import { setView, setMode } from '../../../../data/questionDataSlice'

const Footer = ({ setView, setMode, selected, screen, mode }) => {
	const handleGoBack = () => {}
	const handleMoreInfo = () => {}
	const handleGoForward = () => {
		setView(selected)
	}
	const enterLetterPreviewMode = () => {
		setMode(modes.LETTER_PREVIEW)
	}
	const enterParagraphPreviewMode = () => {
		setMode(modes.PARAGRAPHS_PREVIEW)
	}
	const enterParagraphEditMode = () => {
		setMode(modes.PARAGRAPHS_EDIT)
	}
	const downloadLetter = async () => {
		// TODO find out how this is going to be implemented, if any.
		// const docBlob = await createLetterDocx(selectedParagraphs)
		// saveAs(docBlob, 'Your letter.docx')
	}

	return (
		<footer className="footer">
			<div className="container">
				<div className="footer__actions">
					{mode === modes.TOPICS && (
						<>
							<button
								className="footer__actions-info"
								aria-label="More info"
								type="button"
								onClick={handleMoreInfo}
							>
								<img src={moreInfoIcon} />
							</button>
							<Button
								type="green"
								text="Next"
								rounded
								fn={() => handleGoForward()}
							/>
						</>
					)}
					{mode === modes.PARAGRAPHS_EDIT && (
						<>
							<Button
								type="secondary"
								text="Done"
								rounded
								fn={() => enterParagraphPreviewMode()}
							/>
							<button
								className="footer__actions-drag"
								aria-label="drag to reorder"
							>
								<img src={dragIcon} alt="" />
								Drag to reorder
							</button>
						</>
					)}
					{mode === modes.PARAGRAPHS_PREVIEW && (
						<>
							<Button
								type="secondary"
								text="Edit"
								rounded
								fn={() => enterParagraphEditMode()}
							/>
							<Button
								type="green"
								text="Preview Letter"
								rounded
								fn={() => enterLetterPreviewMode()}
							/>
						</>
					)}
					{mode === modes.LETTER_PREVIEW && (
						<>
							<Button
								type="secondary"
								text="Edit"
								rounded
								fn={() => enterParagraphEditMode()}
							/>
							<Button
								type="green"
								text="Create Document"
								rounded
								fn={() => downloadLetter()}
							/>
						</>
					)}
				</div>
			</div>
		</footer>
	)
}

const mapStateToProps = state => {
	const { questions, topics } = state
	return {
		screen: questions.screen,
		mode: questions.mode,
		selected: topics.selected,
	}
}

const mapDispatchToProps = {
	setView,
	setMode,
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)

import React, { useContext } from 'react'
import { saveAs } from 'file-saver'
import ScreenContext from '../../context'
import Button from '../Button'
import createLetterDocx from '../../utils/createLetterDocx.js'
import modes from '../../state/modes'
import actionType from '../../state/actionType'
import moreInfoIcon from './../../assets/img/more-info-icon.svg'
import dragIcon from './../../assets/img/drag-icon.svg'
import { connect } from 'react-redux'

const Footer = () => {
	const { state, dispatch } = useContext(ScreenContext)
	const { screen, topicsView, mode, selectedParagraphs } = state
	const handleGoBack = () => {
		const isFirstFilterScreen = screen === 1

		if (isFirstFilterScreen) {
			return
		}

		if ((mode === modes.LETTER_PREVIEW) | (mode === modes.PARAGRAPHS_EDIT)) {
			dispatch({
				type: actionType.SET_MODE,
				payload: { mode: modes.PARAGRAPHS_PREVIEW },
			})
		}

		if (mode === modes.TOPICS) {
			dispatch({
				type: actionType.SET_TOPIC_VIEW,
				payload: { value: { isBackwards: true } },
			})
		}
	}
	const handleMoreInfo = () => {}
	const handleGoForward = () => {
		const isLastTopicViewScreen = !topicsView.screen

		if (isLastTopicViewScreen) {
			dispatch({
				type: actionType.SET_MODE,
				payload: { mode: modes.PARAGRAPHS_PREVIEW },
			})
		} else {
			dispatch({ type: actionType.SET_TOPIC_VIEW })
		}
	}
	const enterLetterPreviewMode = () => {
		dispatch({
			type: actionType.SET_MODE,
			payload: { mode: modes.LETTER_PREVIEW },
		})
	}
	const enterParagraphPreviewMode = () => {
		dispatch({
			type: actionType.SET_MODE,
			payload: { mode: modes.PARAGRAPHS_PREVIEW },
		})
	}
	const enterParagraphEditMode = () => {
		dispatch({
			type: actionType.SET_MODE,
			payload: { mode: modes.PARAGRAPHS_EDIT },
		})
	}
	const downloadLetter = async () => {
		const docBlob = await createLetterDocx(selectedParagraphs)

		saveAs(docBlob, 'Your letter.docx')
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

export default connect(null)(Footer)

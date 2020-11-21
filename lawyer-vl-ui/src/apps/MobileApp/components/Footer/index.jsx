import React, { useContext } from 'react'
import { saveAs } from 'file-saver'
import ScreenContext from '../../context'
import Button from '../Button'
import createLetterDocx from '../../utils/createLetterDocx'
import modes from '../../state/modes'
import actionType from '../../state/actionType'
import moreInfoIcon from './../../assets/img/more-info.svg'

const Footer = () => {
	const { state, dispatch } = useContext(ScreenContext)
	const { activeParagraphs, previousScreen, screen, topicsView, mode } = state
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
	const enterParagraphEditMode = () => {
		dispatch({
			type: actionType.SET_MODE,
			payload: { mode: modes.PARAGRAPHS_EDIT },
		})
	}
	const downloadLetter = async () => {
		const docBlob = await createLetterDocx(activeParagraphs)

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
					{mode === modes.PARAGRAPHS_EDIT && <></>}
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
							<Button text="Download" fn={() => downloadLetter()} />
						</>
					)}
				</div>
			</div>
		</footer>
	)
}

export default Footer

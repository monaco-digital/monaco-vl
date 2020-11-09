import React, { useContext } from 'react'
import { saveAs } from 'file-saver'
import classNames from 'classnames'
import ScreenContext from '../../context'
import Button from '../Button'
import createLetterDocx from '../../utils/createLetterDocx'

const Footer = () => {
	const {
		screen,
		setScreen,
		startFilterFlow,
		setStartFilterFlow,
		setStartParagraphPreviewFlow,
		startParagraphPreviewFlow,
		startLetterPreviewMode,
		activeParagraphs,
		setStartLetterPreviewMode,
		startParagraphsEditMode,
		setStartParagraphReorderMode,
		setStartParagraphDeleteMode,
		setStartParagraphsEditMode,
	} = useContext(ScreenContext)
	const handleGoBack = () => {
		const isFirstFilterScreen = screen === 0

		if (isFirstFilterScreen) {
			return
		}

		if (startLetterPreviewMode) {
			setStartLetterPreviewMode(false)
			setStartParagraphPreviewFlow(true)
		}

		if (startFilterFlow) {
			setScreen(screen => (screen -= 1))
		}

		if (startParagraphsEditMode) {
			setStartParagraphsEditMode(false)
			setStartParagraphReorderMode(false)
			setStartParagraphDeleteMode(false)
			setStartParagraphPreviewFlow(true)
		}
	}
	const handleMoreInfo = () => {}
	const handleGoForward = () => {
		const isLastFilterScreen = screen === 2

		if (isLastFilterScreen) {
			setStartFilterFlow(false)
			setStartParagraphPreviewFlow(true)
		} else {
			setScreen(screen => (screen += 1))
		}
	}
	const enterLetterPreviewMode = () => {
		setStartParagraphPreviewFlow(false)
		setStartLetterPreviewMode(true)
	}
	const enterFilterFlow = () => {
		setStartParagraphPreviewFlow(false)
		setStartFilterFlow(true)
		setScreen(0)
	}
	const classBack = classNames('footer_actions-btn footer__actions-back', {
		'footer__actions--disabled': screen === 0,
	})
	const classForward = classNames(
		'footer_actions-btn footer__actions-forward',
		{
			'footer__actions--disabled': false, // for now hardcode to false,
		}
	)
	const downloadLetter = async () => {
		const docBlob = await createLetterDocx(activeParagraphs)

		saveAs(docBlob, 'Your letter.docx')
	}

	return (
		<footer className="footer">
			<div className="container">
				<div className="footer__actions">
					{startFilterFlow && (
						<>
							<button
								className={classBack}
								aria-label="Go back"
								type="button"
								onClick={() => handleGoBack()}
							>
								<i className="fas fa-chevron-left" />
							</button>
							<button
								className="footer_actions-btn footer__actions-info"
								aria-label="More info"
								type="button"
								onClick={handleMoreInfo}
							>
								<i className="far fa-question-circle" />
							</button>
							<button
								className={classForward}
								aria-label="Go forward"
								type="button"
								onClick={() => handleGoForward()}
							>
								<i className="fas fa-chevron-right" />
							</button>
						</>
					)}
					{startParagraphsEditMode && (
						<>
							<button
								className={classBack}
								aria-label="Go back"
								type="button"
								onClick={() => handleGoBack()}
							>
								<i className="fas fa-chevron-left" />
							</button>
						</>
					)}
					{startParagraphPreviewFlow && (
						<>
							<Button
								type="secondary"
								text="Filters"
								fn={() => enterFilterFlow()}
							/>
							<Button text="Preview" fn={() => enterLetterPreviewMode()} />
						</>
					)}
					{startLetterPreviewMode && (
						<>
							<button
								className={classBack}
								aria-label="Go back"
								type="button"
								onClick={() => handleGoBack()}
							>
								<i className="fas fa-chevron-left" />
							</button>
							<Button text="Download" fn={() => downloadLetter()} />
						</>
					)}
				</div>
			</div>
		</footer>
	)
}

export default Footer

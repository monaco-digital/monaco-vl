import React, { useContext } from 'react'
import { saveAs } from 'file-saver'
import classNames from 'classnames'
import ScreenContext from '../../context'
import Button from '../Button'
import createLetterDocx from '../../utils/createLetterDocx'
import modes from '../../state/modes'

const Footer = () => {
	const { state, dispatch } = useContext(ScreenContext)
	const { activeParagraphs, screen, mode } = state

	const handleGoBack = () => {
		const isFirstFilterScreen = screen === 0

		if (isFirstFilterScreen) {
			return
		}

		if ((mode === modes.LETTER_PREVIEW) | (mode === modes.PARAGRAPHS_EDIT)) {
			dispatch({
				type: 'SET_MODE',
				payload: { mode: modes.PARAGRAPHS_PREVIEW },
			})
		}

		if (mode === modes.FILTERS) {
			dispatch({ type: 'DECREMENT_SCREEN' })
		}
	}
	const handleMoreInfo = () => {}
	const handleGoForward = () => {
		const isLastFilterScreen = screen === 2

		if (isLastFilterScreen) {
			dispatch({
				type: 'SET_MODE',
				payload: { mode: modes.PARAGRAPHS_PREVIEW },
			})
		} else {
			dispatch({ type: 'INCREMENT_SCREEN' })
		}
	}
	const enterLetterPreviewMode = () => {
		dispatch({ type: 'SET_MODE', payload: { mode: modes.LETTER_PREVIEW } })
	}
	const enterFilterFlow = () => {
		dispatch({ type: 'SET_MODE', payload: { mode: modes.FILTERS } })
		dispatch({ type: 'SET_SCREEN', payload: { value: 0 } })
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
					{mode === modes.FILTERS && (
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
					{mode === modes.PARAGRAPHS_EDIT && (
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
					{mode === modes.PARAGRAPHS_PREVIEW && (
						<>
							<Button
								type="secondary"
								text="Filters"
								fn={() => enterFilterFlow()}
							/>
							<Button text="Preview" fn={() => enterLetterPreviewMode()} />
						</>
					)}
					{mode === modes.LETTER_PREVIEW && (
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

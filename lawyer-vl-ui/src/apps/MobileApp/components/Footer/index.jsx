import React, { useContext } from 'react'
import classNames from 'classnames'
import ScreenContext from '../../context'

const Footer = () => {
	const {
		screen,
		setScreen,
		setStartFilterFlow,
		setStartParagraphPreviewFlow,
	} = useContext(ScreenContext)
	const handleGoBack = (screen, setScreen) => {
		const isFistFilterScreen = screen === 0

		if (isFistFilterScreen) {
			return
		}

		setScreen(screen => (screen -= 1))
	}
	const handleMoreInfo = () => {}
	const handleGoForward = (
		screen,
		setScreen,
		setStartFilterFlow,
		setStartParagraphPreviewFlow
	) => {
		const isLastFilterScreen = screen === 2

		if (isLastFilterScreen) {
			setStartFilterFlow(false)
			setStartParagraphPreviewFlow(true)
		}

		setScreen(screen => (screen += 1))
	}
	const classBack = classNames('footer__actions-back', {
		'footer__actions--disabled': screen === 0,
	})
	const classForward = classNames('footer__actions-forward', {
		'footer__actions--disabled': false, // for now hardcode to false,
	})

	return (
		<footer className="footer">
			<div className="container">
				<div className="footer__actions">
					<button
						className={classBack}
						aria-label="Go back"
						type="button"
						onClick={() => handleGoBack(screen, setScreen)}
					>
						<i className="fas fa-chevron-left"></i>
					</button>
					<button
						className="footer__actions-info"
						aria-label="More info"
						type="button"
						onClick={handleMoreInfo}
					>
						<i className="far fa-question-circle"></i>
					</button>
					<button
						className={classForward}
						aria-label="Go forward"
						type="button"
						onClick={() =>
							handleGoForward(
								screen,
								setScreen,
								setStartFilterFlow,
								setStartParagraphPreviewFlow
							)
						}
					>
						<i className="fas fa-chevron-right"></i>
					</button>
				</div>
			</div>
		</footer>
	)
}

export default Footer

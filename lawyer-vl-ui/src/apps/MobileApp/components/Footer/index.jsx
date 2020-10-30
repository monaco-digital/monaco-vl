import React from 'react'
import classNames from 'classnames'
import ScreenContext from '../../context'

const Footer = () => {
	const handleGoBack = setScreen => {
		console.log('handleGoBack')
		setScreen(screen => (screen -= 1))
	}
	const handleMoreInfo = () => {}
	const handleGoForward = setScreen => {
		console.log('handleGoForward')
		setScreen(screen => (screen += 1))
	}

	return (
		<ScreenContext.Consumer>
			{({ setScreen, screen }) => {
				const classBack = classNames('footer__actions-back', {
					'footer__actions--disabled': screen === 0,
				})
				const classForward = classNames('footer__actions-forward', {
					'footer__actions--disabled': screen === 2,
				})
				return (
					<footer className="footer">
						<div className="container">
							<div className="footer__actions">
								<button
									className={classBack}
									aria-label="Go back"
									type="button"
									onClick={() => handleGoBack(setScreen)}
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
									onClick={() => handleGoForward(setScreen)}
								>
									<i className="fas fa-chevron-right"></i>
								</button>
							</div>
						</div>
						{
							//JSON.stringify(screen)
						}
					</footer>
				)
			}}
		</ScreenContext.Consumer>
	)
}

export default Footer

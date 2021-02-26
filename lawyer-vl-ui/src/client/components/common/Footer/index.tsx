import React, { useState } from 'react'
import Button from '../../Button'
import moreInfoIcon from './../../../assets/img/more-info-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Route, Switch } from 'react-router-dom'
import AppState from '../../../../data/AppState'
import { CaseTopic } from '@monaco-digital/vl-types/lib/main'
import { Question as QuestionT } from '../../../../types/Questions'
import { removeLastAnsweredQuestion, updateSelectedTopics } from '../../../../data/sessionDataSlice'
import { getNextQuestion } from '../../../../clustering/questionFlow'
import EmailModal from '../EmailModal'

const Footer: React.FC = () => {
	const history = useHistory()

	const selectedTopics = useSelector<AppState, CaseTopic[]>(state => state.session.selectedTopics)
	const answeredQuestions = useSelector<AppState, QuestionT[]>(state => state.session.answeredQuestions)

	const dispatch = useDispatch()

	const [showEmailModal, setShowEmailModal] = useState(false)

	const currentQuestion = getNextQuestion(selectedTopics, answeredQuestions)

	const handleGoBackwardsFromStatements = () => {
		dispatch(removeLastAnsweredQuestion(null))
		history.push('/questions')
	}

	const navigateToHelp = () => {
		history.push('/help')
	}

	const handleGoBackwards = () => {
		const optionsToDeselect = currentQuestion.options.map(option => option.topicId)
		const updatedSelectedTopics = selectedTopics.filter(topic => !optionsToDeselect.includes(topic.id))
		dispatch(updateSelectedTopics(updatedSelectedTopics))
		dispatch(removeLastAnsweredQuestion(null))
	}

	return (
		<footer className="footer">
			<div className="footer__actions">
				<Switch>
					<Route path="/questions">
						<div className="footer__actions__switch__buttons space-x-4">
							<button className="footer__actions-info" aria-label="More info" type="button" onClick={navigateToHelp}>
								<img src={moreInfoIcon} />
							</button>
							<Button
								type="secondary"
								text="Back"
								rounded
								extraClasses={'footer__actions-back-button'}
								fn={() => handleGoBackwards()}
							/>
						</div>
					</Route>
					<Route path="/statements">
						<div className="footer__actions__switch__buttons space-x-4">
							<button className="footer__actions-info" aria-label="More info" type="button" onClick={navigateToHelp}>
								<img src={moreInfoIcon} />
							</button>
							<Button
								type="secondary"
								text="Back"
								rounded
								extraClasses={'footer__actions-back-button'}
								fn={handleGoBackwardsFromStatements}
							/>
						</div>
					</Route>
					<Route path="/preview">
						<>
							<div className="footer__actions__switch__buttons space-x-1 md:space-x-4">
								<button className="footer__actions-info" aria-label="More info" type="button" onClick={navigateToHelp}>
									<img src={moreInfoIcon} />
								</button>
								<Button
									type="secondary"
									text="Back"
									rounded
									extraClasses={'footer__actions-back-button'}
									fn={() => history.goBack()}
								/>
							</div>
							<div className="footer__preview__button">
								<Button type="main" shortText="Email" text="Email" rounded fn={() => setShowEmailModal(true)} />
							</div>
						</>
					</Route>
					<Route path="/help">
						<div className="footer__actions__switch__buttons space-x-4">
							<Button
								type="secondary"
								text="Back"
								rounded
								extraClasses={'footer__actions-back-button'}
								fn={() => history.goBack()}
							/>
						</div>
					</Route>
				</Switch>
			</div>
			<EmailModal isOpen={showEmailModal} onRequestClose={() => setShowEmailModal(false)}></EmailModal>
		</footer>
	)
}
export default Footer

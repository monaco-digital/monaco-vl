import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Route, Switch } from 'react-router-dom';
import { CaseTopic } from '@monaco-digital/vl-types/lib/main';
import AppState from '../../../../data/AppState';
import moreInfoIcon from '../../../assets/img/more-info-icon.svg';
import { Question as QuestionT } from '../../../../types/Questions';
import { removeLastAnsweredQuestion, updateSelectedTopics } from '../../../../data/sessionDataSlice';
import { getNextQuestion } from '../../../../clustering/questionFlow';
import CheckoutModal from '../CheckoutModal';
import Button from '../../Button';
import { downloadDataForDS } from '../../../../ds';

const Footer: React.FC = () => {
	const history = useHistory();

	const selectedTopics = useSelector<AppState, CaseTopic[]>(state => state.session.selectedTopics);
	const answeredQuestions = useSelector<AppState, QuestionT[]>(state => state.session.answeredQuestions);
	const isMonetizationEnabled = useSelector<AppState, boolean>(state => state.features.enableMonetization);
	const isDsFlow = useSelector<AppState, boolean>(state => state.features.dsFlow);

	const dispatch = useDispatch();

	const openCheckoutModal = async () => {
		const freeTopicTemplates = ['_RES', '_ADV'];
		const isFree = selectedTopics.some(topic => freeTopicTemplates.includes(topic.id));

		if (isMonetizationEnabled && !isFree) {
			history.push('/preview/checkout');
		} else {
			history.push('/preview/checkout/email');
		}
	};

	const currentQuestion = getNextQuestion(selectedTopics, answeredQuestions);

	const handleGoBackwardsFromStatements = () => {
		dispatch(removeLastAnsweredQuestion());
		history.push('/questions');
	};

	const navigateToHelp = () => {
		history.push('/help');
	};

	const handleGoBackwards = () => {
		const optionsToDeselect = currentQuestion.options.map(option => option.topicId);
		const updatedSelectedTopics = selectedTopics.filter(topic => !optionsToDeselect.includes(topic.id));
		dispatch(updateSelectedTopics(updatedSelectedTopics));
		dispatch(removeLastAnsweredQuestion());
	};

	return (
		<footer className="footer">
			<div className="footer__actions">
				<Switch>
					<Route path="/questions">
						<div className="footer__actions__switch__buttons space-x-4">
							<button className="footer__actions-info" aria-label="More info" type="button" onClick={navigateToHelp}>
								<img src={moreInfoIcon} alt="More Info" />
							</button>
							<Button
								type="secondary"
								text="Back"
								rounded
								extraClasses="footer__actions-back-button"
								fn={() => handleGoBackwards()}
							/>
						</div>
					</Route>
					<Route path="/statements">
						<div className="footer__actions__switch__buttons space-x-4">
							<button className="footer__actions-info" aria-label="More info" type="button" onClick={navigateToHelp}>
								<img src={moreInfoIcon} alt="More Info" />
							</button>
							<Button
								type="secondary"
								text="Back"
								rounded
								extraClasses="footer__actions-back-button"
								fn={handleGoBackwardsFromStatements}
							/>
						</div>
					</Route>
					<Route path="/preview">
						<>
							<div className="footer__actions__switch__buttons space-x-1 md:space-x-4">
								<button className="footer__actions-info" aria-label="More info" type="button" onClick={navigateToHelp}>
									<img src={moreInfoIcon} alt="More Info" />
								</button>
								<Button
									type="secondary"
									text="Back"
									rounded
									extraClasses="footer__actions-back-button"
									fn={() => history.goBack()}
								/>
							</div>
							<div className="footer__preview__button">
								<Button type="main" shortText="Email" text="Email" rounded fn={openCheckoutModal} />
								{isDsFlow && <Button type="main" shortText="Download" text="Download" rounded fn={downloadDataForDS} />}
							</div>
						</>
					</Route>
					<Route path="/help">
						<div className="footer__actions__switch__buttons space-x-4">
							<Button
								type="secondary"
								text="Back"
								rounded
								extraClasses="footer__actions-back-button"
								fn={() => history.goBack()}
							/>
						</div>
					</Route>
				</Switch>
			</div>
			<CheckoutModal />
		</footer>
	);
};
export default Footer;

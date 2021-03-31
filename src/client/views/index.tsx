import React, { FC, useEffect } from 'react';
import ReactGA from 'react-ga';
import { useSelector, useDispatch } from 'react-redux';
import { CaseTopic } from 'api/vl/models';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';

import DocumentPreview from '../components/common/DocumentPreview';
import AdvicePreview from '../components/common/AdvicePreview';
import Header from '../components/common/Header';
import Questions from '../components/common/Questions';
import { setAllTopics } from '../../data/topicDataSlice';
import { updateSuggestedParagraphs } from '../../data/sessionDataSlice';

import AppState from '../../data/AppState';
import Help from './Help';
import GetStarted from './GetStarted';
import { getAllCaseTopics } from '../../api/vl';
import StatementSelect from '../components/common/StatementSelect';
import { SessionParagraph } from '../../types/SessionDocument';
import { getAllParagraphs } from '../../api/vl/paragraph';
import { disableMonetization, enableMonetization, enableDsFlow, disableDsFlow } from '../../data/featureDataSlice';

import Terms from './Terms';
import CheckoutModal from '../components/common/CheckoutModal';

const Main: FC = () => {
	const selectedTopics = useSelector<AppState, CaseTopic[]>(state => state.session.selectedTopics);
	const advicePreviewOnly = !!selectedTopics.find(t => t.id === '_ADV');

	const dispatch = useDispatch();
	const { search } = useLocation();
	const history = useHistory();

	useEffect(() => {
		history.listen(location => {
			ReactGA.pageview(location.pathname);
		});
	}, [history]);

	useEffect(() => {
		// Pulls feature switch values from URL or local storage, and passes to redux.
		// URL values (if present) should override local storage.

		const queryParams = new URLSearchParams(search);

		let featureStorage: any = {};
		try {
			featureStorage = JSON.parse(localStorage.getItem('vl-features')) || {};
		} catch {
			/* ignore */
		}

		if (queryParams.has('dsFlow') && queryParams.get('dsFlow') === 'true') {
			featureStorage.dsFlow = true;
			dispatch(enableDsFlow());
		} else if (queryParams.has('dsFlow') && queryParams.get('dsFlow') === 'false') {
			featureStorage.dsFlow = false;
			dispatch(disableDsFlow());
		}

		const isMonetizationSet = queryParams.has('enableMonetization');

		if (isMonetizationSet) {
			featureStorage.enableMonetization = queryParams.get('enableMonetization') === 'true';
		}

		const isFromLegalAdviceCentre = queryParams.get('source') === 'lac';
		if (isFromLegalAdviceCentre) {
			featureStorage.enableMonetization = false;
		}

		if ('enableMonetization' in featureStorage) {
			if (featureStorage.enableMonetization) {
				dispatch(enableMonetization());
			} else {
				dispatch(disableMonetization());
			}
		}

		try {
			localStorage.setItem('vl-features', JSON.stringify(featureStorage));
		} catch {
			/* ignore */
		}
	}, [dispatch, search]);

	useEffect(() => {
		(async () => {
			const paragraphs = await getAllParagraphs();
			const caseTopics = await getAllCaseTopics();
			const sessionParagraphs = paragraphs.map(
				paragraph =>
					({
						templateComponent: paragraph,
						documentComponent: null,
						isSelected: paragraph.paragraph?.isAutomaticallyIncluded,
					} as SessionParagraph),
			);
			dispatch(setAllTopics(caseTopics));
			dispatch(updateSuggestedParagraphs(sessionParagraphs));
		})();
	}, [dispatch]);

	return (
		<main className="main">
			<Header />
			<div className="screen container">
				<Switch>
					<Route path="/questions">
						<Questions />
					</Route>
					<Route path="/statements">
						<StatementSelect />
					</Route>
					<Route path="/preview">
						{advicePreviewOnly && <AdvicePreview />}
						{!advicePreviewOnly && <DocumentPreview />}
					</Route>
					<Route path="/terms">
						<Terms />
					</Route>
					<Route path="/help">
						<Help />
					</Route>
					<Route path="/">
						<GetStarted />
					</Route>
				</Switch>
			</div>

			<CheckoutModal />
		</main>
	);
};

export default Main;

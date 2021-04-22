import React, { FC, useEffect } from 'react';
import ReactGA from 'react-ga';
import { useSelector, useDispatch } from 'react-redux';
import { CaseTopic } from 'api/vl/models';
import { Route, Switch, useLocation, useHistory, Redirect } from 'react-router-dom';

import Narrative from 'client/components/common/Narrative';
import DocumentPreview from '../components/common/DocumentPreview';
import AdvicePreview from '../components/common/AdvicePreview';
import Header from '../components/common/Header';
import Questions from '../components/common/Questions';
import Step3Intro from '../components/common/Step3Intro';
import { setAllTopics } from '../../data/topicDataSlice';
import { updateSuggestedParagraphs } from '../../data/sessionDataSlice';

import AppState from '../../data/AppState';
import Help from './Help';
import GetStarted from './GetStarted';
import { getAllCaseTopics } from '../../api/vl';
import StatementSelect from '../components/common/StatementSelect';
import { SessionParagraph } from '../../types/SessionDocument';
import { getAllParagraphs } from '../../api/vl/paragraph';
import { enableDsFlow, disableDsFlow, enableFeature, disableFeature } from '../../data/featureDataSlice';

import Terms from './Terms';
import CheckoutModal from '../components/common/CheckoutModal';

// set of feature names and aliases. Aliases allow A/B testing without making it obvious to the user what's going on.
const featureQueryParams = [
	{ feature: 'enableMonetization', alias: 'fm' },
	{ feature: 'enableNarrative', alias: 'fn' },
	{ feature: 'enableSelect', alias: 'fs' },
];

const Main: FC = () => {
	const enableNarrative = useSelector<AppState, boolean>(state => state.features.enableNarrative);

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

		let featureStorage: Record<string, boolean> = {};

		try {
			featureStorage = JSON.parse(localStorage.getItem('vl-features')) || {};
		} catch {
			/* ignore */
		}

		// dsFlow switch only ever lasts for single session
		if (queryParams.has('dsFlow') && queryParams.get('dsFlow') === 'true') {
			dispatch(enableDsFlow());
		} else if (queryParams.has('dsFlow') && queryParams.get('dsFlow') === 'false') {
			dispatch(disableDsFlow());
		}

		featureQueryParams.forEach(({ alias, feature }) => {
			if (queryParams.has(alias)) {
				featureStorage[feature] = queryParams.get(alias) === 'true';
			}

			if (queryParams.has(feature)) {
				featureStorage[feature] = queryParams.get(feature) === 'true';
			}
		});

		const isFromLegalAdviceCentre = queryParams.get('source') === 'lac';
		if (isFromLegalAdviceCentre) {
			featureStorage.enableMonetization = false;
		}

		Object.entries(featureStorage).forEach(([feature, value]) => {
			if (value) {
				dispatch(enableFeature(feature));
			} else {
				dispatch(disableFeature(feature));
			}
		});

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
						{enableNarrative && <Narrative />}
						{!enableNarrative && <StatementSelect />}
					</Route>
					<Route exact path="/preview">
						<Redirect to="/preview/_ADV" />
					</Route>
					<Route path="/preview/:id">
						<Switch>
							<Route path="/preview/_ADV">
								<AdvicePreview />
							</Route>
							<DocumentPreview />
						</Switch>
					</Route>
					<Route path="/terms">
						<Terms />
					</Route>
					<Route path="/progress-legal-case">
						<Step3Intro />
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

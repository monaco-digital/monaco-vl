//@ts-nocheck
import React, { FC, useEffect } from 'react'
import ReactGA from 'react-ga'
import Footer from '../components/common/Footer'
import DocumentPreview from '../components/common/DocumentPreview'
import AdvicePreview from '../components/common/AdvicePreview'
import Header from '../components/common/Header'
import Questions from '../components/common/Questions'
import { useSelector, useDispatch } from 'react-redux'
import { setAllTopics } from '../../data/topicDataSlice'
import { updateSuggestedParagraphs } from '../../data/sessionDataSlice'

import { CaseTopic } from '@monaco-digital/vl-types/lib/main'
import AppState from '../../data/AppState'
import Help from './Help'
import GetStarted from './GetStarted'
import { getAllCaseTopics } from '../../api/vl/'
import StatementSelect from '../components/common/StatementSelect'
import { SessionParagraph } from '../../types/SessionDocument'
import { Route, Switch, useLocation, useHistory } from 'react-router-dom'
import { getAllParagraphs } from '../../api/vl/paragraph'
import { disableMonetization, enableMonetization } from '../../data/featureDataSlice'

const Main: FC = () => {
	const selectedTopics = useSelector<AppState, CaseTopic[]>(state => state.session.selectedTopics)
	const advicePreviewOnly = selectedTopics.find(t => t.id === '_ADV') ? true : false

	const dispatch = useDispatch()
	const { search } = useLocation()
	const history = useHistory()

	useEffect(() => {
		history.listen(location => {
			ReactGA.pageview(location.pathname)
		})
	}, [])

	useEffect(() => {
		// Pulls feature switch values from URL or local storage, and passes to redux.
		// URL values (if present) should override local storage.

		const queryParams = new URLSearchParams(search)

		let featureStorage = {}
		try {
			featureStorage = JSON.parse(localStorage.getItem('vl-features')) || {}
		} catch {
			/* ignore */
		}

		const isMonetizationSet = queryParams.has('enableMonetization')
		if (isMonetizationSet) {
			featureStorage.enableMonetization = queryParams.get('enableMonetization') === 'true'
		}

		const isFromLegalAdviceCentre = queryParams.get('source') === 'lac'
		if (isFromLegalAdviceCentre) {
			featureStorage.enableMonetization = false
		}

		if ('enableMonetization' in featureStorage) {
			featureStorage.enableMonetization ? dispatch(enableMonetization()) : dispatch(disableMonetization())
		}

		try {
			localStorage.setItem('vl-features', JSON.stringify(featureStorage))
		} catch {
			/* ignore */
		}
	}, [search])

	useEffect(() => {
		//TODO - fix this
		// dispatch(setView(undefined))
		;(async () => {
			const paragraphs = await getAllParagraphs()
			//const paragraphs = await getData()
			const caseTopics = await getAllCaseTopics()
			const sessionParagraphs = paragraphs.map(paragraph => {
				return {
					templateComponent: paragraph,
					documentComponent: null,
					isSelected: false,
				} as SessionParagraph
			})
			dispatch(setAllTopics(caseTopics))
			dispatch(updateSuggestedParagraphs(sessionParagraphs))
		})()
	}, [])

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
					<Route path="/help">
						<Help />
					</Route>
					<Route path="/">
						<GetStarted />
					</Route>
				</Switch>
			</div>
			<Footer />
		</main>
	)
}

export default Main

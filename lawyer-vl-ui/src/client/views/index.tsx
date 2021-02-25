//@ts-nocheck
import React, { FC, useEffect } from 'react'
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
import pages from '../../types/navigation'
import Help from './Help'
import GetStarted from './GetStarted'
import { getAllCaseTopics } from '../../api/vl/'
import StatementSelect from '../components/common/StatementSelect'
import { SessionParagraph } from '../../types/SessionDocument'
import { Route, Switch, useLocation } from 'react-router-dom'
import { getAllParagraphs } from '../../api/vl/paragraph'
import { disableMonetization, enableMonetization } from '../../data/featureDataSlice'

const Main: FC = () => {
	const mode = useSelector<AppState, string>(state => state.navigation.page)
	const selectedTopics = useSelector<AppState, CaseTopic[]>(state => state.session.selectedTopics)
	const advicePreviewOnly = selectedTopics.find(t => t.id === '_ADV') ? true : false

	const dispatch = useDispatch()

	const { search } = useLocation()
	useEffect(() => {
		const queryParams = new URLSearchParams(search)

		// url param to enable monetization for testing prior to release.
		if (queryParams.get('enableMonetization') === 'true') {
			dispatch(enableMonetization())
		}

		// always disable monetization when source is from legal advice centre
		if (queryParams.get('source') === 'lac') {
			dispatch(disableMonetization())
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
					{/* omitted for backwards compatibility for now}
				<Route path="/">
					<Home />
				</Route> */}
					<Route path="/home">
						<GetStarted />
					</Route>
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
					<Route path="/org/:name">
						<GetStarted />
					</Route>
					<Route>
						{/* default for legacy compatibility */}
						{mode === pages.GET_STARTED && <GetStarted />}
						{mode === pages.TOPICS && <Questions />}
						{mode === pages.STATEMENT_SELECT && <StatementSelect />}
						{mode === pages.LETTER_PREVIEW && advicePreviewOnly && <AdvicePreview />}
						{mode === pages.LETTER_PREVIEW && !advicePreviewOnly && <DocumentPreview />}
						{mode === pages.HELP && <Help />}
					</Route>
				</Switch>
			</div>
			<Footer />
		</main>
	)
}

export default Main

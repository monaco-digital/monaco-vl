//@ts-nocheck
import React, { FC, useEffect } from 'react'
import Footer from '../components/common/Footer'
import DocumentPreview from '../components/common/DocumentPreview'
import Header from '../components/common/Header'
import Questions from '../components/common/Questions'
import { useSelector, useDispatch } from 'react-redux'
import { setAllTopics } from '../../data/topicDataSlice'
import { updateSuggestedParagraphs } from '../../data/sessionDataSlice'

import { getData } from '../../api/vlmasersheet'
import AppState from '../../data/AppState'
import pages from '../../types/navigation'
import Help from './Help'
import GetStarted from './GetStarted'
import { getAllCaseTopics } from '../../api/vl/'
import StatementSelect from '../components/common/StatementSelect'
import { SessionParagraph } from '../../types/SessionDocument'
import { Route, Switch } from 'react-router-dom'
import { getAllParagraphs } from '../../api/vl/paragraph'

const Main: FC = () => {
	const mode = useSelector<AppState, string>(state => state.navigation.page)
	const dispatch = useDispatch()

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
						<DocumentPreview />
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
						{mode === pages.LETTER_PREVIEW && <DocumentPreview />}
						{mode === pages.HELP && <Help />}
					</Route>
				</Switch>
			</div>
			<Footer />
		</main>
	)
}

export default Main

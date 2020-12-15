import React, { FC, useEffect } from 'react'
import Footer from '../components/common/Footer'
import LetterPreview from '../components/common/LetterPreview'
import ParagraphsPreview from '../components/common/ParagraphsPreview'
import Header from '../components/common/Header'
import Questions from '../components/common/Questions'
import { useSelector, useDispatch } from 'react-redux'
import { updateAllParagraphs } from '../../data/paragraphsDataSlice'
import { setAllTopics } from '../../data/topicDataSlice'
import { getData } from '../../api/vlmasersheet'
import AppState from '../../data/AppState'
import pages from '../../types/navigation'
import Help from './Help'
import GetStarted from './GetStarted'
import { getAllCaseTopics } from '../../api/vl/'

const Main: FC = () => {
	const mode = useSelector<AppState, string>(state => state.navigation.page)
	const dispatch = useDispatch()

	useEffect(() => {
		//TODO - fix this
		// dispatch(setView(undefined))
		;(async () => {
			const paragraphs = await getData()
			const caseTopics = await getAllCaseTopics()
			dispatch(updateAllParagraphs(paragraphs))
			dispatch(setAllTopics(caseTopics))
		})()
	}, [])

	return (
		<main className="main">
			<Header />
			<div className="screen container">
				{mode === pages.GET_STARTED && <GetStarted />}
				{mode === pages.TOPICS && <Questions />}
				{(mode === pages.PARAGRAPHS_PREVIEW ||
					mode === pages.PARAGRAPHS_EDIT) && <ParagraphsPreview />}
				{mode === pages.LETTER_PREVIEW && <LetterPreview />}
				{mode === pages.HELP && <Help />}
			</div>
			<Footer />
		</main>
	)
}

export default Main

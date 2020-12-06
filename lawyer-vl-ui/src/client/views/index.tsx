import React, { FC, useEffect } from 'react'
import Footer from '../components/common/Footer'
import LetterPreview from '../components/common/LetterPreview'
import ParagraphsPreview from '../components/common/ParagraphsPreview'
import Topics from '../components/common/Topics'
import Header from '../components/common/Header'
import { useSelector, useDispatch } from 'react-redux'
import ParagraphsEditMode from '../components/ParagraphsEditMode'
import { setView } from '../../data/questionDataSlice'
import { updateAllParagraphs } from '../../data/paragraphsDataSlice'
import { getData } from '../../api/vlmasersheet'
import AppState from '../../data/AppState'
import pages from '../../types /navigation'
import Help from './Help'
import GetStarted from './GetStarted'

const Main: FC = () => {
	const mode = useSelector<AppState, string>(state => state.navigation.page)
	const dispatch = useDispatch()

	useEffect(() => {
		//TODO - fix this
		dispatch(setView(undefined))
		;(async () => {
			const paragraphs = await getData()
			dispatch(updateAllParagraphs(paragraphs))
		})()
	}, [])

	return (
		<main className="main">
			<Header />
			<div className="screen container">
				{mode === pages.GET_STARTED && <GetStarted />}
				{mode === pages.TOPICS && <Topics />}
				{mode === pages.PARAGRAPHS_PREVIEW && <ParagraphsPreview />}
				{mode === pages.PARAGRAPHS_EDIT && <ParagraphsEditMode />}
				{mode === pages.LETTER_PREVIEW && <LetterPreview />}
				{mode === pages.HELP && <Help />}
			</div>
			<Footer />
		</main>
	)
}

export default Main

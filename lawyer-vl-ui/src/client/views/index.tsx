import React, { FC, useEffect } from 'react'
import Footer from '../components/Footer'
import LetterPreview from '../components/LetterPreview'
import ParagraphsPreview from '../components/common/ParagraphsPreview'
import Topics from '../components/common/Topics'
import Header from '../components/common/Header'
import { useSelector, useDispatch } from 'react-redux'
import modes from '../state/modes'
import ParagraphsEditMode from '../components/ParagraphsEditMode'
import { setView } from '../../data/questionDataSlice'
import { updateAllParagraphs } from '../../data/paragraphsDataSlice'
import { getData } from '../../api/vlmasersheet'
import AppState from '../../data/AppState'
import GetStarted from './GetStarted'
import Help from './Help'

const Main: FC = () => {
	const mode = useSelector<AppState, string>(state => state.navigation.mode)
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
				{mode === modes.GET_STARTED && <GetStarted />}
				{mode === modes.TOPICS && <Topics />}
				{mode === modes.PARAGRAPHS_PREVIEW && <ParagraphsPreview />}
				{mode === modes.PARAGRAPHS_EDIT && <ParagraphsEditMode />}
				{mode === modes.LETTER_PREVIEW && <LetterPreview />}
				{mode === modes.HELP && <Help />}
			</div>
			<Footer />
		</main>
	)
}

export default Main

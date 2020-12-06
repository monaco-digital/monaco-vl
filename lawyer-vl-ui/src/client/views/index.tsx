import React, { FC, useEffect } from 'react'
import Footer from '../components/common/Footer'
import LetterPreview from '../components/common/LetterPreview'
import ParagraphsPreview from '../components/common/ParagraphsPreview'
import Header from '../components/common/Header'
import Questions from '../components/common/Questions'
import { useSelector, useDispatch } from 'react-redux'
import modes from '../state/modes'
import ParagraphsEditMode from '../components/ParagraphsEditMode'
import setView from '../../data/questionDataSlice'
import { updateAllParagraphs } from '../../data/paragraphsDataSlice'
import { getData } from '../../api/vlmasersheet'
import AppState from '../../data/AppState'
import { NavView } from '../../data/types'

const Main: FC = () => {
	const mode = useSelector<AppState, NavView>(state => state.navigation.mode)
	const dispatch = useDispatch()

	useEffect(() => {
		//TODO - fix this
		// dispatch(setView(undefined))
		;(async () => {
			const paragraphs = await getData()
			dispatch(updateAllParagraphs(paragraphs))
		})()
	}, [])

	return (
		<main className="main">
			<Header />
			<div className="screen container">
				{mode === mode && <Questions />}
				{mode === modes.PARAGRAPHS_PREVIEW && <ParagraphsPreview />}
				{mode === modes.PARAGRAPHS_EDIT && <ParagraphsEditMode />}
				{mode === modes.LETTER_PREVIEW && <LetterPreview />}
			</div>
			<Footer />
		</main>
	)
}

export default Main

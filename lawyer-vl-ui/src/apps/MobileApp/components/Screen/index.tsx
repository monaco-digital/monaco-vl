import React, { useEffect } from 'react'
import Topics from '../Topics'
import ParagraphsPreview from '../ParagraphsPreview'
import ParagraphsEditMode from '../ParagraphsEditMode'
import LetterPreview from '../LetterPreview'
import modes from '../../state/modes'
import { useDispatch, useSelector } from 'react-redux'
import { setView } from '../../../../data/questionDataSlice'
import {
	updateAllParagraphs,
	updateSuggestedParagraphs,
} from '../../../../data/paragraphsDataSlice'
import { getData } from './../../../../api/vlmasersheet'
import AppState from '../../../../data/AppState'
import { CaseTopic } from '../../../../data/types'

const Screen: React.FC = () => {
	const dispatch = useDispatch()
	const mode = useSelector<AppState, any>(state => state.questions.mode)
	const selectedTopics = useSelector<AppState, CaseTopic[]>(
		state => state.topics.selected
	)

	useEffect(() => {
		//dispatch(setView())
		;(async () => {
			const paragraphs = await getData()
			dispatch(updateAllParagraphs(paragraphs))
		})()
	}, [])

	useEffect(() => {
		//dispatch(updateSuggestedParagraphs())
	}, [selectedTopics])

	return (
		<div className="screen container">
			{mode === modes.TOPICS && <Topics />}
			{mode === modes.PARAGRAPHS_PREVIEW && <ParagraphsPreview />}
			{mode === modes.PARAGRAPHS_EDIT && <ParagraphsEditMode />}
			{mode === modes.LETTER_PREVIEW && <LetterPreview />}
		</div>
	)
}

export default Screen

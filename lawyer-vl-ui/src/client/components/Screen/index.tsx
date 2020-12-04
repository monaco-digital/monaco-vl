import React, { useEffect, FC, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import Topics from '../common/Topics'
import ParagraphsEditMode from '../ParagraphsEditMode'
import ParagraphsPreview from '../common/ParagraphsPreview'
import LetterPreview from '../LetterPreview'
import modes from '../../state/modes'
import { setView } from '../../../data/questionDataSlice'
import { updateAllParagraphs } from '../../../data/paragraphsDataSlice'
import { getData } from '../../../api/vlmasersheet'
import AppState from '../../../data/AppState'
import { CaseTopic } from '../../../data/types'

const Screen: FC = () => {
	const dispatch = useDispatch()
	const mode = useSelector<AppState, any>(state => state.questions.mode)
	const selectedTopics = useSelector<AppState, CaseTopic[]>(
		state => state.topics.selected
	)
	const screenRef = useRef(null)

	useEffect(() => {
		//TODO - fix this
		dispatch(setView(undefined))
		;(async () => {
			const paragraphs = await getData()
			dispatch(updateAllParagraphs(paragraphs))
		})()
	}, [])

	return (
		<div ref={screenRef} className="screen container">
			{mode === modes.TOPICS && <Topics />}
			{mode === modes.PARAGRAPHS_PREVIEW && <ParagraphsPreview />}
			{mode === modes.PARAGRAPHS_EDIT && <ParagraphsEditMode />}
			{mode === modes.LETTER_PREVIEW && <LetterPreview />}
		</div>
	)
}

export default Screen

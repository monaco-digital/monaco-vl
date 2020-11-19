import React, { useContext, useEffect } from 'react'
import ScreenContext from '../../context'
import Topics from '../Topics'
import Title from '../Title'
import ParagraphsPreview from '../ParagraphsPreview'
import ParagraphsEditMode from '../ParagraphsEditMode'
import LetterPreview from '../LetterPreview'
import modes from '../../state/modes'
import actionType from '../../state/actionType'

const Screen = () => {
	const { state, dispatch } = useContext(ScreenContext)
	const { mode, screen, topicsView } = state
	const { text } = topicsView

	useEffect(() => {
		dispatch({ type: actionType.SET_TOPIC_VIEW, payload: { value: screen } })
		dispatch({ type: actionType.SET_MODE, payload: { mode: modes.TOPICS } })
	}, [])

	return (
		<div className="screen container">
			{text && <Title text={text} />}
			{mode === modes.TOPICS && <Topics />}
			{mode === modes.PARAGRAPHS_PREVIEW && <ParagraphsPreview />}
			{mode === modes.PARAGRAPHS_EDIT && <ParagraphsEditMode />}
			{mode === modes.LETTER_PREVIEW && <LetterPreview />}
		</div>
	)
}

export default Screen

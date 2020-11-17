import React, { useContext, useEffect } from 'react'
import ScreenContext from '../../context'
import Filters from '../Filters'
import ParagraphsPreview from '../ParagraphsPreview'
import ParagraphsEditMode from '../ParagraphsEditMode'
import LetterPreview from '../LetterPreview'
import modes from '../../state/modes'
import actionType from '../../state/actionType'

const Screen = () => {
	const { state, dispatch } = useContext(ScreenContext)
	const { mode } = state

	useEffect(() => {
		dispatch({ type: actionType.SET_MODE, payload: { mode: modes.FILTERS } })
		dispatch({ type: actionType.SET_DEFAULT_FILTERS })
	}, [])

	return (
		<div className="screen container">
			{mode === modes.FILTERS && <Filters />}
			{mode === modes.PARAGRAPHS_PREVIEW && <ParagraphsPreview />}
			{mode === modes.PARAGRAPHS_EDIT && <ParagraphsEditMode />}
			{mode === modes.LETTER_PREVIEW && <LetterPreview />}
		</div>
	)
}

export default Screen

import React, { useContext } from 'react'
import ScreenContext from '../../context'
import Filters from '../Filters'
import ParagraphsPreview from '../ParagraphsPreview'
import ParagraphsEditMode from '../ParagraphsEditMode'
import LetterPreview from '../LetterPreview'

const Screen = () => {
	const {
		startFilterFlow,
		startParagraphPreviewFlow,
		startParagraphsEditMode,
		startLetterPreviewMode,
	} = useContext(ScreenContext)

	return (
		<div className="screen container">
			{startFilterFlow && <Filters />}
			{startParagraphPreviewFlow && <ParagraphsPreview />}
			{startParagraphsEditMode && <ParagraphsEditMode />}
			{startLetterPreviewMode && <LetterPreview />}
		</div>
	)
}

export default Screen

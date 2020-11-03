import React, { useContext } from 'react'
import ScreenContext from '../../context'
import Filters from '../Filters'
import ParagraphsPreview from '../ParagraphsPreview'
import ParagraphsEditMode from '../ParagraphsEditMode'

const Screen = () => {
	const {
		startFilterFlow,
		startParagraphPreviewFlow,
		startParagraphsEditMode,
	} = useContext(ScreenContext)

	return (
		<div className="screen container">
			{startFilterFlow && <Filters />}
			{startParagraphPreviewFlow && <ParagraphsPreview />}
			{startParagraphsEditMode && <ParagraphsEditMode />}
		</div>
	)
}

export default Screen

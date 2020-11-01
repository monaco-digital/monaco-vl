import React from 'react'
import ScreenContext from '../../context'
import Filters from '../Filters'
import ParagraphsPreview from '../ParagraphsPreview'
import ParagraphsEditMode from '../ParagraphsEditMode'

const Screen = () => {
	return (
		<ScreenContext.Consumer>
			{({
				startFilterFlow,
				startParagraphPreviewFlow,
				startParagraphsEditMode,
			}) => (
				<div className="screen container">
					{startFilterFlow && <Filters />}
					{startParagraphPreviewFlow && <ParagraphsPreview />}
					{startParagraphsEditMode && <ParagraphsEditMode />}
				</div>
			)}
		</ScreenContext.Consumer>
	)
}

export default Screen

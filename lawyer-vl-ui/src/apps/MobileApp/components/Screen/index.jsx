import React from 'react'
import ScreenContext from '../../context'
import Title from '../Title'
import Filters from '../Filters'
import ParagraphsPreview from '../ParagraphsPreview'

const Screen = () => {
	return (
		<ScreenContext.Consumer>
			{({ startFilterFlow, startParagraphPreviewFlow }) => (
				<div className="screen container">
					<Title title="Tap all that apply" />
					{startFilterFlow && <Filters />}
					{startParagraphPreviewFlow && <ParagraphsPreview />}
				</div>
			)}
		</ScreenContext.Consumer>
	)
}

export default Screen

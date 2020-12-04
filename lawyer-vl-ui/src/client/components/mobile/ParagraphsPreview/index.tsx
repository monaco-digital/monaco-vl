import React from 'react'
import Title from '../../Title'
import Paragraph from '../../common/Paragraph'
import introParagraph from '../../../data/introParagraph'
import { useSelector, useDispatch } from 'react-redux'
import AppState from '../../../../data/AppState'
import { Paragraph as ParagraphT } from '../../../../data/types'
import useViewport from '../../../utils/useViewport'

const ParagraphsPreview: React.FC = () => {
	const suggestedParagraphs = useSelector<AppState, ParagraphT[]>(
		state => state.paragraphs.suggested
	)

	return (
		<>
			<Title
				text={{
					heading: '[Mobile] Letter builder',
					subHeading: 'Select paragraphs by tapping on them.',
				}}
			/>
			{
				// TODO refactor the paragraphs class
			}
			<div className="paragraphs-preview paragraphs-preview--mobile">
				{/*TODO - fix this as introParagraph object is not complete*/}
				<div className="paragraphs-preview__select">
					<Paragraph paragraphData={introParagraph as ParagraphT} />
					{suggestedParagraphs.map(paragraph => (
						<Paragraph key={paragraph.id} paragraphData={paragraph} />
					))}
				</div>
			</div>
		</>
	)
}

export default ParagraphsPreview

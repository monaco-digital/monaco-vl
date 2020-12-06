import React, { FC } from 'react'
import Title from '../../Title'
import Paragraph from '../../common/Paragraph'
import { useSelector } from 'react-redux'
import AppState from '../../../../data/AppState'
import { Paragraph as ParagraphT } from '../../../../data/types'

const ParagraphsPreview: FC = () => {
	const suggestedParagraphs = useSelector<AppState, ParagraphT[]>(
		state => state.paragraphs.suggested
	)

	return (
		<>
			<Title
				text={{
					heading: 'Build your letter',
					subHeading: 'Select paragraphs by tapping on them.',
				}}
			/>
			{
				// TODO refactor the paragraphs class
			}
			<div className="paragraphs-preview paragraphs-preview--mobile">
				<div className="paragraphs-preview__select">
					{suggestedParagraphs.map(paragraph => (
						<Paragraph key={paragraph.id} paragraphData={paragraph} isMobile />
					))}
				</div>
			</div>
		</>
	)
}

export default ParagraphsPreview

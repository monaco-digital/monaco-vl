import React from 'react'
import Title from '../Title'
import Paragraph from '../Paragraph'
import introParagraph from '../../data/introParagraph'
import { useSelector } from 'react-redux'
import AppState from '../../../../data/AppState'
import { Paragraph as ParagraphT } from '../../../../data/types'

const ParagraphsPreview: React.FC = () => {
	const suggestedParagraphs = useSelector<AppState, ParagraphT[]>(
		state => state.paragraphs.suggested
	)
	return (
		<>
			<Title
				text={{
					heading: 'Letter builder',
					subHeading: 'Select paragraphs by tapping on them.',
				}}
			/>
			<div className="paragraphs">
				<div className="container">
					{/*TODO - fix this as introParagraph object is not complete*/}
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

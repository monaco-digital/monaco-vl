import React from 'react'
import Title from '../Title'
import Paragraph from '../Paragraph'
import introParagraph from '../../data/introParagraph'
import { useSelector } from 'react-redux'

const ParagraphsPreview = () => {
	const suggestedParagraphs = useSelector(state => state.paragraphs.suggested)

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
					<Paragraph paragraphData={introParagraph} />
					{suggestedParagraphs.map(paragraph => (
						<Paragraph key={paragraph.id} paragraphData={paragraph} />
					))}
				</div>
			</div>
		</>
	)
}

export default ParagraphsPreview

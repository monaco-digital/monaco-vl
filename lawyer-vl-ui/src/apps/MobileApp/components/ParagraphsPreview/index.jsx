import React from 'react'
import Title from '../Title'
import Paragraph from '../Paragraph'
import introParagraph from '../../data/introParagraph'
import { connect } from 'react-redux'

const ParagraphsPreview = ({ suggested }) => {
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
					{suggested.map(paragraph => (
						<Paragraph key={paragraph.id} paragraphData={paragraph} />
					))}
				</div>
			</div>
		</>
	)
}

const mapStateToProps = state => {
	const { paragraphs } = state
	return {
		suggested: paragraphs.suggested,
	}
}

export default connect(mapStateToProps)(ParagraphsPreview)

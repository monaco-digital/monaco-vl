import React from 'react'
import { connect } from 'react-redux'
import letter from './../../data/letter'
import Title from './../Title'

const LetterPreview = ({ selectedParagraphs }) => {
	return (
		<>
			<Title
				text={{
					heading: 'Letter preview',
				}}
			/>
			<div className="letter-preview">
				<div className="letter-preview__box">
					<div className="letter-preview__box-title">{letter.title}</div>
					{selectedParagraphs.map(({ paragraph, id }) => (
						<p key={id}>{paragraph}</p>
					))}
				</div>
			</div>
		</>
	)
}
const mapStateToProps = state => {
	const { paragraphs } = state
	return {
		selectedParagraphs: paragraphs.selected,
	}
}

export default connect(mapStateToProps)(LetterPreview)

import React from 'react'
import { useSelector } from 'react-redux'
import letter from '../../data/letter'
import Title from '../Title'
import AppState from '../../../data/AppState'
import { Paragraph } from '../../../data/types'

const LetterPreview: React.FC = () => {
	const selectedParagraphs = useSelector<AppState, Paragraph[]>(
		state => state.paragraphs.selected
	)

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

export default LetterPreview

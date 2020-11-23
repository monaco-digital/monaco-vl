import React, { useContext } from 'react'
import ScreenContext from './../../context'
import letter from './../../data/letter'
import Title from './../Title'

const LetterPreview = () => {
	const { state } = useContext(ScreenContext)
	const { selectedParagraphs } = state
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

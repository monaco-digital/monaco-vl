import React, { useContext } from 'react'
import ScreenContext from './../../context'
import letter from './../../data/letter'

const LetterPreview = () => {
	const { activeParagraphs } = useContext(ScreenContext)
	return (
		<div className="letter-preview">
			<div className="letter-preview__title">{letter.title}</div>
			{activeParagraphs.map(paragraph => (
				<p>{paragraph}</p>
			))}
		</div>
	)
}

export default LetterPreview

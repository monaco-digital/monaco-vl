import React, { useContext, useEffect } from 'react'
import Title from '../Title'
import ScreenContext from '../../context'
import Paragraph from '../Paragraph'
import Button from '../Button'
import modes from '../../state/modes'

const ParagraphsPreview = () => {
	const { state, dispatch } = useContext(ScreenContext)
	const { activeParagraphs, filteredParagraphs } = state
	const enterParagraphEditMode = () => {
		dispatch({ type: 'SET_MODE', payload: { mode: modes.PARAGRAPHS_EDIT } })
	}

	useEffect(() => {
		dispatch({ type: 'SET_FILTERED_PARAGRAPHS' })
	}, [])

	return (
		<>
			<Title title="Tap accordingly." />
			<Button
				type="neutral"
				text={`Selected: ${activeParagraphs.length}`}
				fn={() => enterParagraphEditMode()}
			/>
			<div className="paragraphs">
				{filteredParagraphs.map((paragraphText, i) => (
					<Paragraph
						key={`${paragraphText}-${i}`}
						paragraphText={paragraphText}
					/>
				))}
			</div>
		</>
	)
}

export default ParagraphsPreview

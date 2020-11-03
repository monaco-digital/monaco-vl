import React, { useContext, useEffect } from 'react'
import Title from '../Title'
import ScreenContext from '../../context'
import Paragraph from '../Paragraph'
import Button from '../Button'
import paragraphs from '../../data/paragraphs'

const ParagraphsPreview = () => {
	const {
		activeParagraphs,
		activeFilters,
		filteredParagraphs,
		setFilteredParagraphs,
		setStartParagraphPreviewFlow,
		setStartParagraphsEditMode,
	} = useContext(ScreenContext)
	const aggregateAndSetParagraphs = () => {
		const aggregatedActiveParagraphs = []

		for (const filter of activeFilters) {
			aggregatedActiveParagraphs.push(...paragraphs[filter])
		}

		setFilteredParagraphs(aggregatedActiveParagraphs)
	}
	const enterParagraphEditMode = () => {
		setStartParagraphPreviewFlow(false)
		setStartParagraphsEditMode(true)
	}

	useEffect(() => {
		aggregateAndSetParagraphs()
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

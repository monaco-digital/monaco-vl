import React, { useContext, useEffect } from 'react'
import Title from '../Title'
import ScreenContext from '../../context'
import Paragraph from '../Paragraph'
import Button from '../Button'
import paragraphs from '../../data/paragraphs'

const ParagraphsPreview = () => {
	const { activeFilters, setFilteredParagraphs } = useContext(ScreenContext)
	const aggregateAndSetParagraphs = () => {
		const aggregatedActiveParagraphs = []

		for (const filter of activeFilters) {
			aggregatedActiveParagraphs.push(...paragraphs[filter])
		}

		setFilteredParagraphs(aggregatedActiveParagraphs)
	}

	useEffect(() => {
		aggregateAndSetParagraphs()
	}, [])

	const test = text => {
		console.log(`This is the text ${text}`)
	}

	return (
		<ScreenContext.Consumer>
			{({ filteredParagraphs }) => (
				<>
					<Title title="Tap accordingly." />
					<Button type="neutral" text="Selected:" fn={() => test('hello')} />
					<div className="paragraphs">
						{filteredParagraphs.map(paragraphText => (
							<Paragraph paragraphText={paragraphText} />
						))}
					</div>
				</>
			)}
		</ScreenContext.Consumer>
	)
}

export default ParagraphsPreview

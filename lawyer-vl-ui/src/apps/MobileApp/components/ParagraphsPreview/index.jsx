import React, { useContext, useEffect } from 'react'
import Title from '../Title'
import ScreenContext from '../../context'
import Paragraph from '../Paragraph'
import actionType from '../../state/actionType'
import { getData } from '../../../../api/vlmasersheet'
import introParagraph from '../../data/introParagraph'

const ParagraphsPreview = () => {
	const { state, dispatch } = useContext(ScreenContext)
	const { suggestedParagraphs } = state

	useEffect(() => {
		;(async () => {
			const paragraphs = await getData()
			dispatch({
				type: actionType.SET_SUGGESTED_PARAGRAPHS,
				payload: { value: paragraphs },
			})
		})()
	}, [])

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

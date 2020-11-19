import React, { useContext, useEffect } from 'react'
import Title from '../Title'
import ScreenContext from '../../context'
import Paragraph from '../Paragraph'
import actionType from '../../state/actionType'
import { getData } from '../../../../api/vlmasersheet'

const ParagraphsPreview = () => {
	const { state, dispatch } = useContext(ScreenContext)
	const { suggestedParagraphs } = state

	useEffect(() => {
		;(async () => {
			const paragraphs = await getData()
			dispatch({
				type: actionType.SET_FILTERED_PARAGRAPHS,
				payload: { value: paragraphs },
			})
		})()
	}, [])

	return (
		<>
			<Title text={{ heading: 'Letter builder' }} />
			<div className="paragraphs">
				{suggestedParagraphs.map(paragraph => (
					<Paragraph key={paragraph.id} paragraphData={paragraph} />
				))}
			</div>
		</>
	)
}

export default ParagraphsPreview

import React, { FC, useEffect } from 'react'
import ParagraphsPreviewMobile from '../../mobile/ParagraphsPreview'
import ParagraphsPreviewDesktop from '../../desktop/ParagraphsPreview'
import useViewport from '../../../utils/useViewport'
import { useSelector, useDispatch } from 'react-redux'
import { updateSuggestedParagraphs } from '../../../../data/paragraphsDataSlice'
import { AppState } from '../../../../data/AppState'
import { CaseTopic } from '../../../../data/types'

const ParagraphsPreview: FC = () => {
	const { isDesktop } = useViewport()
	const dispatch = useDispatch()
	const selectedTopics = useSelector<AppState, CaseTopic[]>(
		state => state.topics.selected
	)

	useEffect(() => {
		console.log('Update suggested paragraphs based on ', selectedTopics.length)
		dispatch(updateSuggestedParagraphs(selectedTopics))
	}, [selectedTopics])

	return (
		<>
			{isDesktop ? <ParagraphsPreviewDesktop /> : <ParagraphsPreviewMobile />}
		</>
	)
}

export default ParagraphsPreview

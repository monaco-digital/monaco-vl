import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ParagraphsPreviewMobile from '../../mobile/ParagraphsPreview'
import ParagraphsPreviewDesktop from '../../desktop/ParagraphsPreview'
import useViewport from '../../../utils/useViewport'
import { updateSuggestedParagraphs } from '../../../../data/paragraphsDataSlice'
import AppState from '../../../../data/AppState'
import { CaseTopic } from '../../../../data/types'

const ParagraphsPreview: FC = () => {
	const { isDesktop } = useViewport()
	const selectedTopics = useSelector<AppState, CaseTopic[]>(
		state => state.topics.selected
	)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(updateSuggestedParagraphs(selectedTopics))
	}, [selectedTopics])

	return (
		<>
			{isDesktop ? <ParagraphsPreviewDesktop /> : <ParagraphsPreviewMobile />}
		</>
	)
}

export default ParagraphsPreview

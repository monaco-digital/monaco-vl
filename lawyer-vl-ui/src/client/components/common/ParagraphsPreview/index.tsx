import React, { FC, useEffect } from 'react'
import ParagraphsPreviewMobile from '../../mobile/ParagraphsPreview'
import ParagraphsPreviewDesktop from '../../desktop/ParagraphsPreview'
import useViewport from '../../../utils/useViewport'
import { useSelector, useDispatch } from 'react-redux'
import { updateSuggestedParagraphs } from '../../../../data/paragraphsDataSlice'
import { AppState } from '../../../../data/AppState'
import { AuthorPerspective, CaseTopic } from '../../../../data/types'

const ParagraphsPreview: FC = () => {
	const { isDesktop } = useViewport()
	const dispatch = useDispatch()
	const selectedTopics = useSelector<AppState, CaseTopic[]>(
		state => state.topics.selected
	)
	const authorPerspective = useSelector<AppState, AuthorPerspective>(
		state => state.filters.authorPerspective
	)

	useEffect(() => {
		dispatch(updateSuggestedParagraphs({ selectedTopics, authorPerspective }))
	}, [selectedTopics, authorPerspective])

	return (
		<>
			{isDesktop ? <ParagraphsPreviewDesktop /> : <ParagraphsPreviewMobile />}
		</>
	)
}

export default ParagraphsPreview

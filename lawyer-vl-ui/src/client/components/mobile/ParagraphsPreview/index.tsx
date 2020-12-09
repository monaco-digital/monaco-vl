import React, { FC } from 'react'
import Title from '../../Title'
import Paragraph from '../../common/Paragraph'
import { useSelector } from 'react-redux'
import AppState from '../../../../data/AppState'
import { Paragraph as ParagraphT } from '../../../../data/types'
import ParagraphsEditMode from '../ParagraphsEditMode'
import pages from '../../../../types/navigation'
import useViewport from '../../../utils/useViewport'
import { ParagraphToggle } from '../../../../types/paragraph'

const ParagraphsPreview: FC = () => {
	const { isMobile } = useViewport()

	const suggestedParagraphs = useSelector<AppState, ParagraphT[]>(
		state => state.paragraphs.suggested
	)
	const { mode, toggle: pToggle } = useSelector<
		AppState,
		{ mode: any; toggle: ParagraphToggle }
	>(state => {
		const mode = state.navigation.page
		const toggle = state.paragraphs.toggle
		return { mode, toggle }
	})

	if (mode === pages.PARAGRAPHS_EDIT) {
		return <ParagraphsEditMode />
	} else {
		return (
			<>
				<Title
					text={{
						heading: 'Build your letter',
						subHeading: 'Select paragraphs by tapping on them.',
					}}
				/>
				{
					// TODO refactor the paragraphs class
				}
				<div className="paragraphs-preview paragraphs-preview--mobile">
					<div className="paragraphs-preview__select">
						{suggestedParagraphs.map(paragraph => (
							<Paragraph
								key={paragraph.id}
								paragraphData={paragraph}
								isMobile
								pToggle={pToggle}
							/>
						))}
					</div>
				</div>
			</>
		)
	}
}

export default ParagraphsPreview

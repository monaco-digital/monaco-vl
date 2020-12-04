import React, { FC } from 'react'
import ParagraphsPreviewMobile from '../../mobile/ParagraphsPreview'
import ParagraphsPreviewDesktop from '../../desktop/ParagraphsPreview'
import useViewport from '../../../utils/useViewport'

const ParagraphsPreview: FC = () => {
	const { isDesktop } = useViewport()

	return (
		<>
			{isDesktop ? <ParagraphsPreviewDesktop /> : <ParagraphsPreviewMobile />}
		</>
	)
}

export default ParagraphsPreview

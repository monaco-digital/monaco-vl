import React, { FC } from 'react'
import { Paragraph } from '../../../../data/types'

const LetterPreviewParagraph: FC<{ paragraphs: Paragraph[] }> = ({
	paragraphs,
}) => {
	return (
		<>
			{paragraphs.map(({ paragraph, bold, id }) => {
				if (bold) {
					return (
						<p key={id}>
							<b>{paragraph}</b>
						</p>
					)
				}

				return <p key={id}>{paragraph}</p>
			})}
		</>
	)
}

export default LetterPreviewParagraph

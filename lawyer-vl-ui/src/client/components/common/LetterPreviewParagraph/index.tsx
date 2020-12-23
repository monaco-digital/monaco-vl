import React, { FC } from 'react'
import { Paragraph } from '../../../../data/types'

const LetterPreviewParagraph: FC<{ paragraphs: Paragraph[] }> = ({
	paragraphs,
}) => {
	return (
		<>
			{paragraphs.map(({ textThirdPerson, bold, id }) => {
				if (bold) {
					return (
						<p key={id}>
							<b>{textThirdPerson}</b>
						</p>
					)
				}

				return <p key={id}>{textThirdPerson}</p>
			})}
		</>
	)
}

export default LetterPreviewParagraph

import { LetterParagraph } from '../components/letter/LetterParagraph'
import React, { useEffect, useState } from 'react'

type Props = {}

export const LetterBuilderView: React.FC<Props> = (props: Props) => {
	return (
		<>
			<LetterParagraph />
		</>
	)
}

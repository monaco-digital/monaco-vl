import { DocumentParagraphStaticText, StaticText } from '@monaco-digital/vl-types/lib/main'
import React, { FC } from 'react'
import { SessionParagraph } from '../../../../types/SessionDocument'

export const PreviewStaticText: FC<{
	templateStaticText: StaticText
	documentStaticText: DocumentParagraphStaticText
}> = ({ templateStaticText, documentStaticText }) => {
	return <span>{documentStaticText?.textFirstPerson || templateStaticText.textFirstPerson}</span>
}

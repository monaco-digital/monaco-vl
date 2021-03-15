import { DocumentParagraphStaticText, StaticText } from '@monaco-digital/vl-types/lib/main'
import React, { FC } from 'react'

interface Props {
	templateStaticText: StaticText
	documentStaticText: DocumentParagraphStaticText
}

export const PreviewStaticText: FC<Props> = ({ templateStaticText, documentStaticText }: Props) => {
	return <span>{documentStaticText?.textFirstPerson || templateStaticText.textFirstPerson}</span>
}

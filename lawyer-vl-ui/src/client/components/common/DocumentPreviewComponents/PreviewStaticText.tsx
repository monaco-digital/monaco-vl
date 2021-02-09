import { DocumentParagraphStaticText, StaticText } from '@monaco-digital/vl-types/lib/main'
import React, { FC } from 'react'
import { SessionParagraph } from '../../../../types/SessionDocument'

const PreviewDocumentParagraphStaticText: FC<{ staticText: DocumentParagraphStaticText }> = ({ staticText }) => {
	return <span>{staticText.textFirstPerson}</span>
}

const PreviewTemplateParagraphStaticText: FC<{ staticText: StaticText }> = ({ staticText }) => {
	return <span>{staticText.textFirstPerson}</span>
}

export { PreviewDocumentParagraphStaticText, PreviewTemplateParagraphStaticText }

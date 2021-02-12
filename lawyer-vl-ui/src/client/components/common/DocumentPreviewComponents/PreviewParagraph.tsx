import {
	DocumentParagraph,
	DocumentParagraphStaticText,
	DocumentParagraphBulletPoints,
	DocumentParagraphEditableText,
	TemplateParagraph,
	StaticText,
	EditableText,
	BulletPoints,
} from '@monaco-digital/vl-types/lib/main'
import React, { FC } from 'react'
import { SessionParagraph } from '../../../../types/SessionDocument'
import { PreviewDocumentParagraphStaticText, PreviewTemplateParagraphStaticText } from './PreviewStaticText'
import { PreviewDocumentParagraphBulletPoints, PreviewTemplateParagraphBulletPoints } from './PreviewBulletPoints'
import { PreviewDocumentParagraphEditableText, PreviewTemplateParagraphEditableText } from './PreviewEditableText'

const PreviewParagraph: FC<{ paragraph: SessionParagraph }> = ({ paragraph }) => {
	// If documentComponent exists, i.e. the user has entered some data
	if (paragraph.documentComponent) {
		const documentParagraph = paragraph.documentComponent as DocumentParagraph
		return (
			<div style={{ border: '1px solid red', padding: '10px', margin: '10px' }}>
				{documentParagraph.documentParagraphComponents.map(documentParagraphComponent => {
					switch (documentParagraphComponent.type) {
						case 'StaticText':
							return (
								<PreviewDocumentParagraphStaticText
									staticText={documentParagraphComponent as DocumentParagraphStaticText}
								/>
							)
						case 'EditableText':
							return (
								<PreviewDocumentParagraphEditableText
									editableText={documentParagraphComponent as DocumentParagraphEditableText}
								/>
							)
						case 'BulletPoints':
							return (
								<PreviewDocumentParagraphBulletPoints
									bulletPoints={documentParagraphComponent as DocumentParagraphBulletPoints}
								/>
							)
						default:
							return null
					}
				})}
			</div>
		)
	} else {
		const templateParagraph = paragraph.templateComponent as TemplateParagraph
		return (
			<div style={{ border: '1px solid #f0f0f0', padding: '10px', margin: '10px' }}>
				{templateParagraph.paragraphComponents.map(templateParagraphComponent => {
					switch (templateParagraphComponent.type) {
						case 'StaticText':
							return <PreviewTemplateParagraphStaticText staticText={templateParagraphComponent as StaticText} />
						case 'EditableText':
							return <PreviewTemplateParagraphEditableText editableText={templateParagraphComponent as EditableText} />
						case 'BulletPoints':
							return <PreviewTemplateParagraphBulletPoints bulletPoints={templateParagraphComponent as BulletPoints} />
						default:
							return null
					}
				})}
			</div>
		)
	}
}

export { PreviewParagraph }

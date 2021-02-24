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
import { PreviewStaticText } from './PreviewStaticText'
import { PreviewBulletPoints } from './PreviewBulletPoints'
import { PreviewEditableText } from './PreviewEditableText'
import classNames from 'classnames'

const PreviewParagraph: FC<{ paragraph: SessionParagraph }> = ({ paragraph }) => {
	/* const classes = classNames('questions', {
		[`questions__${type}`]: type,
	}) */
	// If documentComponent exists, i.e. the user has entered some data
	const templateParagraph = paragraph.templateComponent as TemplateParagraph
	const documentParagraph = paragraph.documentComponent as DocumentParagraph
	return (
		<div style={{ padding: '5px', margin: '10px' }}>
			{templateParagraph.paragraph?.paragraphComponents.map(paragraphComponent => {
				const matchingDocumentComponent = documentParagraph?.documentParagraphComponents.find(
					dpc => paragraphComponent.id === dpc.baseTemplateComponent
				)
				switch (paragraphComponent.type) {
					case 'StaticText':
						return (
							<PreviewStaticText
								templateStaticText={paragraphComponent as StaticText}
								documentStaticText={matchingDocumentComponent as DocumentParagraphStaticText}
							/>
						)
					case 'EditableText':
						return (
							<PreviewEditableText
								templateEditableText={paragraphComponent as EditableText}
								documentEditableText={matchingDocumentComponent as DocumentParagraphEditableText}
							/>
						)
					case 'BulletPoints':
						return (
							<PreviewBulletPoints
								templateBulletPoints={paragraphComponent as BulletPoints}
								documentBulletPoints={matchingDocumentComponent as DocumentParagraphBulletPoints}
							/>
						)
					default:
						return null
				}
			})}
		</div>
	)
}

export { PreviewParagraph }

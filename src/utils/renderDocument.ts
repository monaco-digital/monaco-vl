import {
	Document,
	DocumentComponent,
	DocumentParagraph,
	DocumentSection,
	DocumentParagraphBulletPoints,
	DocumentParagraphStaticText,
	DocumentParagraphEditableText,
} from '@monaco-digital/vl-types/lib/main'

export const getDocumentParagraphStaticTextText = (documentParagraphStaticText: DocumentParagraphStaticText) => {
	return documentParagraphStaticText.textFirstPerson
}

export const getDocumentParagraphBulletPoints = (
	documentParagraphBulletPoints: DocumentParagraphBulletPoints
): string => {
	const bulletPointsText = documentParagraphBulletPoints.completedBulletPoints
		.map(bp => {
			return `- ${bp.value}`
		})
		.join('\n')
	return `\n${bulletPointsText}\n`
}

export const getDocumentParagraphEditableText = (documentParagraphEditableText: DocumentParagraphEditableText) => {
	return documentParagraphEditableText.value
}

export const getParagraphText = (documentParagraphs: DocumentParagraph): string => {
	return documentParagraphs.documentParagraphComponents
		.map(dpc => {
			switch (dpc.type) {
				case 'BulletPoints':
					return getDocumentParagraphBulletPoints(dpc as DocumentParagraphBulletPoints)
				case 'StaticText':
					return getDocumentParagraphStaticTextText(dpc as DocumentParagraphStaticText)
				case 'EditableText':
					return getDocumentParagraphEditableText(dpc as DocumentParagraphEditableText)
				default:
					return ''
			}
		})
		.join('')
}

export const getDocumentComponentText = (documentComponent: DocumentComponent): string => {
	if (!documentComponent) return ''
	if (documentComponent.type === 'TemplateContentSection' || documentComponent.type === 'UserContentSection') {
		const documentSection = documentComponent as DocumentSection
		return documentSection.documentComponents
			.map(dc => {
				return getDocumentComponentText(dc)
			})
			.join('\n\n')
	} else if (documentComponent.type === 'Paragraph') {
		return getParagraphText(documentComponent as DocumentParagraph)
	}
	return ''
}

export const getDocumentText = (document: Document): string => {
	return document.documentComponents
		.map(documentComponent => {
			return getDocumentComponentText(documentComponent)
		})
		.join('\n\n')
}

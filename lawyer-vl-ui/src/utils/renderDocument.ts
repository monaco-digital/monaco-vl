import {
	Document,
	DocumentComponent,
	DocumentParagraph,
	DocumentSection,
	DocumentParagraphBulletPoints,
	DocumentParagraphStaticText,
	DocumentParagraphEditableText,
} from '@monaco-digital/vl-types/lib/main'

export const getDocumentText = (document: Document): string => {
	return document.documentComponents
		.map(documentComponent => {
			return getDocumentComponentText(documentComponent)
		})
		.join('\n\n')
}

export const getDocumentComponentText = (documentComponent: DocumentComponent) => {
	if (!documentComponent) return ''
	if (documentComponent.type === 'TemplateContentSection' || documentComponent.type === 'UserContentSection') {
		const documentSection = documentComponent as DocumentSection
		const sectionComponents = documentSection.documentComponents
		return documentSection.documentComponents
			.map(dc => {
				return getDocumentComponentText(dc)
			})
			.join('\n')
	} else if (documentComponent.type === 'Paragraph') {
		return getParagraphText(documentComponent as DocumentParagraph)
	}
	return ''
}

export const getParagraphText = (documentParagraphs: DocumentParagraph) => {
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

export const getDocumentParagraphStaticTextText = (documentParagraphStaticText: DocumentParagraphStaticText) => {
	return documentParagraphStaticText.textFirstPerson
}

export const getDocumentParagraphBulletPoints = (documentParagraphBulletPoints: DocumentParagraphBulletPoints) => {
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

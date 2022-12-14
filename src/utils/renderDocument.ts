import {
	Document,
	DocumentComponent,
	DocumentParagraph,
	DocumentSection,
	DocumentParagraphBulletPoints,
	DocumentParagraphStaticText,
	DocumentParagraphEditableText,
} from 'api/vl/models';
import store from 'data/store';

export const getDocumentParagraphStaticTextText = (
	documentParagraphStaticText: DocumentParagraphStaticText,
): string => {
	const { features } = store.getState();
	const { academyFlow } = features;
	if (academyFlow) {
		return documentParagraphStaticText.textThirdPerson;
	}
	return documentParagraphStaticText.textFirstPerson;
};

export const getDocumentParagraphBulletPoints = (
	documentParagraphBulletPoints: DocumentParagraphBulletPoints,
): string => {
	const bulletPointsText = documentParagraphBulletPoints.completedBulletPoints.map(bp => `- ${bp.value}`).join('\n');
	return `\n${bulletPointsText}\n`;
};

export const getDocumentParagraphEditableText = (
	documentParagraphEditableText: DocumentParagraphEditableText,
): string => documentParagraphEditableText.value;

export const getParagraphText = (documentParagraphs: DocumentParagraph): string =>
	documentParagraphs.documentParagraphComponents
		.map(dpc => {
			switch (dpc.type) {
				case 'BulletPoints':
					return getDocumentParagraphBulletPoints(dpc as DocumentParagraphBulletPoints);
				case 'StaticText':
					return getDocumentParagraphStaticTextText(dpc as DocumentParagraphStaticText);
				case 'EditableText':
					return getDocumentParagraphEditableText(dpc as DocumentParagraphEditableText);
				default:
					return '';
			}
		})
		.join('');

export const getDocumentComponentText = (documentComponent: DocumentComponent): string => {
	if (!documentComponent) return '';
	if (documentComponent.type === 'TemplateContentSection' || documentComponent.type === 'UserContentSection') {
		const documentSection = documentComponent as DocumentSection;
		return documentSection.documentComponents.map(dc => getDocumentComponentText(dc)).join('\n\n');
	}
	if (documentComponent.type === 'Paragraph') {
		return getParagraphText(documentComponent as DocumentParagraph);
	}
	return '';
};

export const getDocumentText = (document: Document): string =>
	document.documentComponents.map(documentComponent => getDocumentComponentText(documentComponent)).join('\n\n');

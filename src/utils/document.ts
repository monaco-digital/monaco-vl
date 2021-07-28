import {
	ParagraphComponent,
	StaticText,
	EditableText,
	BulletPoints,
	Document,
	DocumentComponent,
	DocumentParagraph,
	DocumentSection,
	DocumentParagraphBulletPoints,
	DocumentParagraphComponent,
	DocumentParagraphStaticText,
	DocumentParagraphEditableText,
	Template,
	TemplateComponent,
	TemplateSection,
	TemplateParagraph,
} from 'api/vl/models';

import _ from 'lodash';
import { nanoid } from 'nanoid';
import {
	SessionDocument,
	SessionDocumentComponent,
	SessionDocumentSection,
	SessionParagraph,
} from '../types/SessionDocument';

export const createDocumentComponent = (sessionDocumentComponent: SessionDocumentComponent): DocumentComponent => {
	if (
		sessionDocumentComponent.type === 'TemplateContentSection' ||
		sessionDocumentComponent.type === 'UserContentSection'
	) {
		const section = sessionDocumentComponent as SessionDocumentSection;
		return {
			id: nanoid(),
			version: 1,
			type: sessionDocumentComponent.type,
			baseTemplateComponent: section.templateComponent.id,
			documentComponents: section.sessionDocumentComponents.map(sdc => createDocumentComponent(sdc)),
		} as DocumentSection;
	}
	if (sessionDocumentComponent.type === 'Paragraph') {
		const sessionParagraph = sessionDocumentComponent as SessionParagraph;
		return sessionParagraph.documentComponent;
	}
	return null;
};

const templateParagraphComponentToDocumentParagraphComponent = (
	paragraphComponent: ParagraphComponent,
): DocumentParagraphComponent => {
	switch (paragraphComponent.type) {
		case 'StaticText': {
			const staticTextParagraph = paragraphComponent as StaticText;
			return {
				id: nanoid(),
				baseTemplateComponent: staticTextParagraph.id,
				type: 'StaticText',
				textFirdPerson: staticTextParagraph.textFirstPerson,
				textThirdPerson: staticTextParagraph.textThirdPerson,
			} as DocumentParagraphStaticText;
		}
		case 'EditableText': {
			const editableTextParagraph = paragraphComponent as EditableText;
			return {
				id: nanoid(),
				baseTemplateComponent: editableTextParagraph.id,
				type: 'EditableText',
				value: editableTextParagraph.placeholder,
			} as DocumentParagraphEditableText;
		}
		case 'BulletPoints': {
			// if there are bullet points in the template, is the preview the first opportunity to see them?
			const bulletPointsParagraph = paragraphComponent as BulletPoints;
			// find matching in suggestedParagraphs
			return {
				id: nanoid(),
				baseTemplateComponent: bulletPointsParagraph.id,
				type: 'BulletPoints',
				completedBulletPoints: bulletPointsParagraph.bulletPoints?.map(bulletPoint => ({
					id: bulletPoint.id,
					value: bulletPoint.placeholder,
				})),
			} as DocumentParagraphBulletPoints;
		}
		default:
			return null;
	}
};

export const createDocumentParagraph = (
	templateParagraph: TemplateParagraph,
	paragraphs: SessionParagraph[],
): DocumentParagraph => {
	const matchingSessionParagraph = paragraphs.find(
		paragraph => _.get(paragraph, 'documentComponent.baseTemplateComponent') === templateParagraph.id,
	);
	const existingDocumentParagraph = matchingSessionParagraph && matchingSessionParagraph.documentComponent;
	if (existingDocumentParagraph) {
		return existingDocumentParagraph as DocumentParagraph;
	}
	return {
		id: nanoid(),
		type: 'Paragraph',
		baseTemplateComponent: templateParagraph.id,
		documentParagraphComponents: templateParagraph.paragraph?.paragraphComponents.map(paragraphComponent =>
			templateParagraphComponentToDocumentParagraphComponent(paragraphComponent),
		),
	} as DocumentParagraph;
};

//   type: "Image" | "Paragraph" | "Signature" | "Header" | "Section" | "TemplateContentSection" | "UserContentSection";

const createDocumentComponentFromTemplateComponent = (
	templateComponent: TemplateComponent,
	paragraphs: SessionParagraph[],
): DocumentComponent => {
	switch (templateComponent.type) {
		case 'Paragraph': {
			// See if paragraph exists in sessionParagraphs
			const documentParagraph = paragraphs.find(
				paragraph => _.get(paragraph, 'documentComponent.baseTemplateComponent') === templateComponent.id,
			);
			if (documentParagraph) {
				return documentParagraph.documentComponent;
			}
			// if not create one
			return createDocumentParagraph(templateComponent as TemplateParagraph, paragraphs);
		}
		case 'TemplateContentSection': {
			const templateComponentSection = templateComponent as TemplateSection;
			return {
				id: nanoid(),
				version: 1,
				type: 'TemplateContentSection',
				baseTemplateComponent: templateComponent.id,
				documentComponents: templateComponentSection.templateComponents.map(m =>
					createDocumentComponentFromTemplateComponent(m, paragraphs),
				),
			} as DocumentSection;
		}
		case 'UserContentSection':
			return {
				id: nanoid(),
				version: 1,
				type: 'UserContentSection',
				baseTemplateComponent: templateComponent.id,
				documentComponents: paragraphs.map(sessionParagraph =>
					sessionParagraph.documentComponent
						? sessionParagraph.documentComponent
						: createDocumentParagraph(sessionParagraph.templateComponent as TemplateParagraph, paragraphs),
				),
			} as DocumentSection;
		default:
			return null;
	}
};

export const createDocumentFromTemplate = (template: Template, paragraphs: SessionParagraph[]): Document =>
	({
		// create new Document object
		id: nanoid(),
		version: 1,
		baseTemplate: template.id,
		documentComponents: template.templateComponents.map(tc =>
			createDocumentComponentFromTemplateComponent(tc, paragraphs),
		),
		meta: {
			created: Date.now(),
			updated: Date.now(),
		},
	} as Document);

export const createDocument = (sessionDocument: SessionDocument): Document => {
	const documentComponents = sessionDocument.sessionDocumentComponents.map(sd =>
		createDocumentComponent(sd),
	) as DocumentComponent[];

	const doc = {
		id: nanoid(),
		version: 1,
		baseTemplate: sessionDocument.template.id,
		documentComponents,
		meta: {
			created: Date.now(),
			updated: Date.now(),
		},
	} as Document;

	return doc;
};

export const getLetterText = (): string => '';
// paragraphs.map(sp => sp.documentComponent.)
/* const fixedParagraphs = CustomParagraphs.getParagraphs(selectedTopics)
	const { top: topParagraphs, bottom: bottomParagraphs } = fixedParagraphs
	const top = topParagraphs.map(({ paragraph }) => paragraphToString(paragraph)).join('\n\n')
	const middle = paragraphs.map(item => paragraphToString(item.paragraph)).join('\n\n')
	const bottom = bottomParagraphs.map(({ paragraph }) => paragraph).join('\n\n')
	return top.concat('\n\n').concat(middle).concat('\n\n').concat(bottom) */

export const getLetterParagraphs = (): string => null;
/* const fixedParagraphs = CustomParagraphs.getParagraphs(selectedTopics)
	const { top: topParagraphs, bottom: bottomParagraphs } = fixedParagraphs
	const top = topParagraphs.map(paragraph => paragraph)
	const middle = paragraphs.map(paragraph => paragraph)
	const bottom = bottomParagraphs.map(paragraph => paragraph)
	return null
	/* return {
		top,
		middle,
		bottom,
	} */

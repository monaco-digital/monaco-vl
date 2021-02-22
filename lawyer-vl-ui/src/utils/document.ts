import {
	SessionDocument,
	SessionDocumentComponent,
	SessionDocumentSection,
	SessionParagraph,
} from '../types/SessionDocument'
import {
	CaseTopic,
	Paragraph,
	ParagraphComponent,
	StaticText,
	EditableText,
	BulletPoints,
	BulletPoint,
} from '@monaco-digital/vl-types/lib/main'
import {
	Document,
	DocumentComponent,
	DocumentParagraph,
	DocumentSection,
	DocumentParagraphBulletPoints,
	DocumentParagraphComponent,
	DocumentParagraphStaticText,
	DocumentParagraphEditableText,
} from '@monaco-digital/vl-types/lib/main'
import { Template, TemplateComponent, TemplateSection, TemplateParagraph } from '@monaco-digital/vl-types/lib/main'
import _ from 'lodash'
import { nanoid } from 'nanoid'
import { getDocumentComponentText } from './renderDocument'
import { Session } from 'inspector'

export const createDocument = (sessionDocument: SessionDocument): Document => {
	const documentComponents = sessionDocument.sessionDocumentComponents.map(sd => {
		return createDocumentComponent(sd)
	}) as DocumentComponent[]

	const doc = {
		id: nanoid(),
		version: 1,
		baseTemplate: sessionDocument.template.id,
		documentComponents: documentComponents,
		meta: {
			created: Date.now(),
			updated: Date.now(),
		},
	} as Document

	console.log('doc-->', doc)
	return doc
}

export const createDocumentComponent = (sessionDocumentComponent: SessionDocumentComponent): DocumentComponent => {
	if (
		sessionDocumentComponent.type === 'TemplateContentSection' ||
		sessionDocumentComponent.type === 'UserContentSection'
	) {
		const section = sessionDocumentComponent as SessionDocumentSection
		return {
			id: nanoid(),
			version: 1,
			type: sessionDocumentComponent.type,
			baseTemplateComponent: section.templateComponent.id,
			documentComponents: section.sessionDocumentComponents.map(sdc => createDocumentComponent(sdc)),
		} as DocumentSection
	} else if (sessionDocumentComponent.type === 'Paragraph') {
		const sessionParagraph = sessionDocumentComponent as SessionParagraph
		console.log('sessionParagraph.documentComponent', sessionParagraph.documentComponent)
		return sessionParagraph.documentComponent
	}
}

export const createDocumentParagraphComponent = () => {}

export const createDocumentParagraph = (
	templateParagraph: TemplateParagraph,
	paragraphs: SessionParagraph[]
): DocumentParagraph => {
	console.log('The template paragraph is: ', templateParagraph)
	const matchingSessionParagraph = paragraphs.find(
		paragraph => _.get(paragraph, 'documentComponent.baseTemplateComponent') === templateParagraph.id
	)
	const existingDocumentParagraph = matchingSessionParagraph && matchingSessionParagraph.documentComponent
	if (existingDocumentParagraph) {
		return existingDocumentParagraph as DocumentParagraph
	}
	return {
		id: nanoid(),
		type: 'Paragraph',
		baseTemplateComponent: templateParagraph.id,
		documentParagraphComponents: templateParagraph.paragraph?.paragraphComponents.map(paragraphComponent =>
			templateParagraphComponentToDocumentParagraphComponent(paragraphComponent)
		),
	} as DocumentParagraph
}

const templateParagraphComponentToDocumentParagraphComponent = (
	paragraphComponent: ParagraphComponent
): DocumentParagraphComponent => {
	switch (paragraphComponent.type) {
		case 'StaticText':
			const staticTextParagraph = paragraphComponent as StaticText
			return {
				id: nanoid(),
				baseTemplateComponent: staticTextParagraph.id,
				type: 'StaticText',
				textFirstPerson: staticTextParagraph.textFirstPerson,
				textThirdPerson: staticTextParagraph.textThirdPerson,
			} as DocumentParagraphStaticText
		case 'EditableText':
			const editableTextParagraph = paragraphComponent as EditableText
			return {
				id: nanoid(),
				baseTemplateComponent: editableTextParagraph.id,
				type: 'EditableText',
				value: editableTextParagraph.placeholder,
			} as DocumentParagraphEditableText
		case 'BulletPoints':
			// if there are bullet points in the template, is the preview the first opportunity to see them?
			const bulletPointsParagraph = paragraphComponent as BulletPoints
			// find matching in suggestedParagraphs
			return {
				id: nanoid(),
				baseTemplateComponent: bulletPointsParagraph.id,
				type: 'BulletPoints',
				completedBulletPoints: bulletPointsParagraph.bulletPoints?.map(bulletPoint => {
					return {
						id: bulletPoint.id,
						value: bulletPoint.placeholder,
					}
				}),
			} as DocumentParagraphBulletPoints
		default:
			return null
	}
}

export const createDocumentFromTemplate = (template: Template, paragraphs: SessionParagraph[]): Document => {
	// create new Document object
	return {
		id: nanoid(),
		version: 1,
		baseTemplate: template.id,
		documentComponents: template.templateComponents.map(tc =>
			createDocumentComponentFromTemplateComponent(tc, paragraphs)
		),
		meta: {
			created: Date.now(),
			updated: Date.now(),
		},
	} as Document
}

//   type: "Image" | "Paragraph" | "Signature" | "Header" | "Section" | "TemplateContentSection" | "UserContentSection";

const createDocumentComponentFromTemplateComponent = (
	templateComponent: TemplateComponent,
	paragraphs: SessionParagraph[]
): DocumentComponent => {
	switch (templateComponent.type) {
		case 'Paragraph':
			// See if paragraph exists in sessionParagraphs
			const documentParagraph = paragraphs.find(
				paragraph => _.get(paragraph, 'documentComponent.baseTemplateComponent') === templateComponent.id
			)
			if (documentParagraph) {
				return documentParagraph.documentComponent
			}
			// if not create one
			return createDocumentParagraph(templateComponent as TemplateParagraph, paragraphs)
		case 'TemplateContentSection':
			const templateComponentSection = templateComponent as TemplateSection
			return {
				id: nanoid(),
				version: 1,
				type: 'TemplateContentSection',
				baseTemplateComponent: templateComponent.id,
				documentComponents: templateComponentSection.templateComponents.map(m =>
					createDocumentComponentFromTemplateComponent(m, paragraphs)
				),
			} as DocumentSection
		case 'UserContentSection':
			return {
				id: nanoid(),
				version: 1,
				type: 'UserContentSection',
				baseTemplateComponent: templateComponent.id,
				documentComponents: paragraphs.map(sessionParagraph => {
					return sessionParagraph.documentComponent
						? sessionParagraph.documentComponent
						: createDocumentParagraph(sessionParagraph.templateComponent as TemplateParagraph, paragraphs)
				}),
			} as DocumentSection
		default:
			return null
	}
}

export const getLetterText = (selectedTopics: CaseTopic[], paragraphs: SessionParagraph[]) => {
	// paragraphs.map(sp => sp.documentComponent.)

	return ''
	/* const fixedParagraphs = CustomParagraphs.getParagraphs(selectedTopics)
	const { top: topParagraphs, bottom: bottomParagraphs } = fixedParagraphs
	const top = topParagraphs.map(({ paragraph }) => paragraphToString(paragraph)).join('\n\n')
	const middle = paragraphs.map(item => paragraphToString(item.paragraph)).join('\n\n')
	const bottom = bottomParagraphs.map(({ paragraph }) => paragraph).join('\n\n')
	return top.concat('\n\n').concat(middle).concat('\n\n').concat(bottom) */
}

export const getLetterParagraphs = (selectedTopics: CaseTopic[], paragraphs: SessionParagraph[]) => {
	return null
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
}

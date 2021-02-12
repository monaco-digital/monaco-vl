import {
	SessionParagraph,
	SessionDocument,
	SessionDocumentComponent,
	SessionDocumentSection,
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
	DocumentHeader,
	DocumentImage,
	DocumentParagraph,
	DocumentSection,
	DocumentParagraphBulletPoints,
	DocumentParagraphComponent,
	DocumentParagraphDropdown,
	DocumentParagraphStaticText,
	DocumentSignature,
	DocumentParagraphEditableText,
} from '@monaco-digital/vl-types/lib/main'
import {
	TemplateHeader,
	TemplateImage,
	TemplateSignature,
	Template,
	TemplateComponent,
	TemplateSection,
	TemplateParagraph,
} from '@monaco-digital/vl-types/lib/main'
import _ from 'lodash'
import { template } from '../api/google/template'
import { convertCompilerOptionsFromJson } from 'typescript'

export const createSessionDocument = (template: Template, paragraphs: SessionParagraph[]): SessionDocument => {
	return {
		template,
		document: createDocumentFromTemplate(template, paragraphs),
		sessionDocumentComponents: template.templateComponents.map(templateComponent =>
			createSessionDocumentComponent(templateComponent, paragraphs)
		),
	} as SessionDocument
}

export const createSessionDocumentComponent = (
	templateComponent: TemplateComponent,
	paragraphs: SessionParagraph[]
): SessionDocumentComponent => {
	switch (templateComponent.type) {
		case 'UserContentSection':
			return createSessionDocumentSection(templateComponent as TemplateSection, paragraphs)
		case 'TemplateContentSection':
			return createSessionDocumentSection(templateComponent as TemplateSection, paragraphs)
		case 'Paragraph':
			return createSessionDocumentParagraph(templateComponent as TemplateParagraph, paragraphs)
		default:
			return null
	}
}

const createSessionDocumentSection = (
	templateSection: TemplateSection,
	paragraphs: SessionParagraph[]
): SessionDocumentComponent => {
	if (templateSection.type === 'UserContentSection') {
		return {
			type: 'UserContentSection',
			templateComponent: templateSection,
			documentComponent: null,
			sessionDocumentComponents: paragraphs.map(paragraph =>
				createSessionDocumentComponent(paragraph.templateComponent, paragraphs)
			),
		} as SessionDocumentSection
	} else {
		return {
			type: 'TemplateContentSection',
			templateComponent: templateSection,
			documentComponent: null,
			sessionDocumentComponents: templateSection.templateComponents.map(templateComponent =>
				createSessionDocumentComponent(templateComponent, paragraphs)
			),
		} as SessionDocumentSection
	}
}

const createSessionDocumentParagraph = (
	templateParagraph: TemplateParagraph,
	paragraphs: SessionParagraph[]
): SessionParagraph => {
	const matchingSessionParagraph = paragraphs.find(
		paragraph => _.get(paragraph, 'documentComponent.baseTemplateComponent') === templateParagraph.id
	)
	const existingDocumentParagraph = matchingSessionParagraph && matchingSessionParagraph.documentComponent

	return {
		type: 'Paragraph',
		templateComponent: templateParagraph,
		documentComponent: existingDocumentParagraph,
		isSelected: true,
	} as SessionParagraph
}

export const createDocumentParagraph = (
	templateParagraph: TemplateParagraph,
	paragraphs: SessionParagraph[]
): DocumentParagraph => {
	const matchingSessionParagraph = paragraphs.find(
		paragraph => _.get(paragraph, 'documentComponent.baseTemplateComponent') === templateParagraph.id
	)
	const existingDocumentParagraph = matchingSessionParagraph && matchingSessionParagraph.documentComponent
	if (existingDocumentParagraph) {
		return existingDocumentParagraph as DocumentParagraph
	}
	return {
		id: templateParagraph.id,
		type: 'Paragraph',
		baseTemplateComponent: templateParagraph.id,
		documentParagraphComponents: templateParagraph.paragraph.paragraphComponents.map(paragraphComponent =>
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
				baseTemplateComponent: paragraphComponent.id,
				type: 'StaticText',
				textFirstPerson: staticTextParagraph.textFirstPerson,
				textThirdPerson: staticTextParagraph.textThirdPerson,
			} as DocumentParagraphStaticText
		case 'EditableText':
			const editableTextParagraph = paragraphComponent as EditableText
			return {
				baseTemplateComponent: paragraphComponent.id,
				type: 'EditableText',
				value: null,
			} as DocumentParagraphEditableText
		case 'BulletPoints':
			// if there are bullet points in the template, is the preview the first opportunity to see them?
			const bulletPointsParagraph = paragraphComponent as BulletPoints
			// find matching in suggestedParagraphs
			return {
				baseTemplateComponent: paragraphComponent.id,
				type: 'BulletPoints',
				completedBulletPoints: [],
			} as DocumentParagraphBulletPoints
		default:
			return null
	}
}

export const createDocumentFromTemplate = (template: Template, paragraphs: SessionParagraph[]): Document => {
	// create new Document object
	return {
		id: 'asda',
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
				id: 'doinasd89d3',
				version: 1,
				type: 'TemplateContentSection',
				baseTemplateComponent: templateComponent.id,
				documentComponents: templateComponentSection.templateComponents.map(m =>
					createDocumentComponentFromTemplateComponent(m, paragraphs)
				),
			} as DocumentSection
		case 'UserContentSection':
			return {
				id: 'doinasd893',
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

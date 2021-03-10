/* eslint-disable @typescript-eslint/no-use-before-define */
/* Recursive functions used in this file */

import {
	SessionParagraph,
	SessionDocument,
	SessionDocumentComponent,
	SessionDocumentSection,
} from '../types/SessionDocument'
import { Template, TemplateComponent, TemplateSection, TemplateParagraph } from '@monaco-digital/vl-types/lib/main'
import _ from 'lodash'
import { createDocumentFromTemplate, createDocumentParagraph } from './document'

/*
	Because existing session documents may have TemplateComponents that have had corresponding DocumentComponents that have
	been customised, provide the ability to regenerate the sessiondocument only updating the session paragraphs
	Assumes UserContentSection exists at top level
*/
export const refreshSessionDocument = (
	sessionDocument: SessionDocument,
	paragraphs: SessionParagraph[]
): SessionDocument => {
	sessionDocument.sessionDocumentComponents.forEach(sessionDocumentComponent => {
		if (sessionDocumentComponent.type === 'UserContentSection') {
			const sessionDocumentSection = sessionDocumentComponent as SessionDocumentSection
			sessionDocumentSection.sessionDocumentComponents = paragraphs
		}
	})

	return sessionDocument
}

export const createSessionDocument = (template: Template, paragraphs: SessionParagraph[]): SessionDocument => {
	if (!template) return null
	console.log('The template being used is: ', template)
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

	const newParagraph = createDocumentParagraph(templateParagraph, paragraphs)

	return {
		type: 'Paragraph',
		templateComponent: templateParagraph,
		documentComponent: existingDocumentParagraph || newParagraph,
		isSelected: true,
	} as SessionParagraph
}

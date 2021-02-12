import { createSlice } from '@reduxjs/toolkit'
import { SessionParagraph } from '../types/SessionDocument'
import { Question } from '../types/Questions'
import {
	CaseTopic,
	DocumentParagraphBulletPoints,
	DocumentParagraphEditableText,
	DocumentParagraph,
	ParagraphComponent,
	TemplateComponent,
	TemplateParagraph,
} from '@monaco-digital/vl-types/lib/main'
import _ from 'lodash'
import { BulletPoints } from './types'
import { createDocumentParagraph } from '../utils/document'

export const slice = createSlice({
	name: 'session',
	initialState: {
		suggestedParagraphs: [] as SessionParagraph[],
		selectedTopics: [] as CaseTopic[],
		answeredQuestions: [] as Question[],
	},
	reducers: {
		selectParagraphs: (state, action) => {
			const ids = action.payload
			state.suggestedParagraphs.map(suggestedParagraph => {
				if (ids.includes(suggestedParagraph.templateComponent.id)) {
					suggestedParagraph.isSelected = true
				}
			})
		},
		deselectParagraphs: (state, action) => {
			const ids = action.payload
			state.suggestedParagraphs.map(suggestedParagraph => {
				if (ids.includes(suggestedParagraph.templateComponent.id)) {
					suggestedParagraph.isSelected = false
				}
			})
		},
		updateBulletPoints: (state, action) => {
			console.log('UPDATE BULLET POINTS----->>>>>')
			const { id, values } = action.payload
			state.suggestedParagraphs = _updateBulletPoints(id, values, state.suggestedParagraphs)
		},
		updateEditableText: (state, action) => {
			const { id, value } = action.payload
			state.suggestedParagraphs = _updateEditableText(id, value, state.suggestedParagraphs)
		},
		updateSelectedTopics: (state, action) => {
			state.selectedTopics = _.compact(action.payload)
		},
		updateSuggestedParagraphs: (state, action) => {
			state.suggestedParagraphs = action.payload
		},
		updateAnsweredQuestions: (state, action) => {
			state.answeredQuestions = action.payload
		},
		addAnsweredQuestion: (state, action) => {
			const latestQuestion = action.payload
			state.answeredQuestions.push(latestQuestion)
		},
		removeLastAnsweredQuestion: (state, action) => {
			state.answeredQuestions.pop()
		},
	},
})

const _updateBulletPoints = (
	id: string,
	values: { id: string; value: string }[],
	sessionParagraphs: SessionParagraph[]
): SessionParagraph[] => {
	for (let sessionParagraph of sessionParagraphs) {
		// find by documentcomponents first
		// baseTemplateComponent
		const documentParagraph = sessionParagraph.documentComponent as DocumentParagraph

		const findDocumentParagraphBulletPoints = (documentParagraph: DocumentParagraph): DocumentParagraphBulletPoints => {
			if (!documentParagraph) return null
			const match = documentParagraph.documentParagraphComponents.find(
				dpc => dpc.baseTemplateComponent === id && dpc.type === 'BulletPoints'
			)
			return (match as unknown) as DocumentParagraphBulletPoints
		}

		const documentParagraphBulletPoints = findDocumentParagraphBulletPoints(documentParagraph)

		if (documentParagraphBulletPoints) {
			console.log('FOUND MATCHING BPS', documentParagraphBulletPoints)
			documentParagraphBulletPoints.completedBulletPoints = values
			return sessionParagraphs
		} else {
			// Try to match on template
			/* This has the potential to have weird side effects if there is more than one editable component in a paragraph and
			the full structure of the DocumentComponent is not created first time round. SHouldn't happen, but just in case you are reading this... */
			const template = sessionParagraph.templateComponent as TemplateParagraph
			const templateMatch = template.paragraph.paragraphComponents.find(
				pc => pc.id === id && pc.type === 'BulletPoints'
			)
			if (templateMatch && !sessionParagraph.documentComponent) {
				sessionParagraph.documentComponent = createDocumentParagraph(template, sessionParagraphs)
				console.log('create doc from template', sessionParagraph.documentComponent)
				const documentParagraphBulletPoints = findDocumentParagraphBulletPoints(
					sessionParagraph.documentComponent as DocumentParagraph
				)
				documentParagraphBulletPoints.completedBulletPoints = values
				return sessionParagraphs
			}
			console.log('No template or doceument match!!!!!!!!!!')
		}
	}
	return sessionParagraphs
}

const _updateEditableText = (id: string, value: string, sessionParagraphs: SessionParagraph[]): SessionParagraph[] => {
	for (let sessionParagraph of sessionParagraphs) {
		// find by documentcomponents first
		// baseTemplateComponent
		const documentParagraph = sessionParagraph.documentComponent as DocumentParagraph

		const findDocumentParagraphEditableText = (documentParagraph: DocumentParagraph): DocumentParagraphEditableText => {
			const match = documentParagraph.documentParagraphComponents.find(
				dpc => dpc.baseTemplateComponent === id && dpc.type === 'EditableText'
			)
			return (match as unknown) as DocumentParagraphEditableText
		}

		const documentParagraphEditableText = findDocumentParagraphEditableText(documentParagraph)

		if (documentParagraphEditableText) {
			documentParagraphEditableText.value = value
			return sessionParagraphs
		} else {
			// Try to match on template
			/* This has the potential to have weird side effects if there is more than one editable component in a paragraph and
			the full structure of the DocumentComponent is not created first time round. SHouldn't happen, but just in case you are reading this... */
			const template = sessionParagraph.templateComponent as TemplateParagraph
			const templateMatch = template.paragraph.paragraphComponents.find(
				pc => pc.id === id && pc.type === 'BulletPoints'
			)
			if (templateMatch && !sessionParagraph.documentComponent) {
				sessionParagraph.documentComponent = createDocumentParagraph(template, sessionParagraphs)
				const documentParagraphEditableText = findDocumentParagraphEditableText(
					sessionParagraph.documentComponent as DocumentParagraph
				)
				documentParagraphEditableText.value = value
				return sessionParagraphs
			}
		}
	}
	return sessionParagraphs
}

export const {
	updateSuggestedParagraphs,
	updateAnsweredQuestions,
	updateSelectedTopics,
	addAnsweredQuestion,
	removeLastAnsweredQuestion,
	selectParagraphs,
	deselectParagraphs,
	updateBulletPoints,
	updateEditableText,
} = slice.actions

export default slice.reducer

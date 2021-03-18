import { createSlice } from '@reduxjs/toolkit'
import {
	SessionDocument,
	SessionParagraph,
	SessionDocumentComponent,
	SessionDocumentSection,
} from '../types/SessionDocument'
import { Question } from '../types/Questions'
import {
	CaseTopic,
	DocumentParagraph,
	TemplateParagraph,
	Template,
	DocumentParagraphComponent,
} from '@monaco-digital/vl-types/lib/main'
import _ from 'lodash'
import { createDocument, createDocumentParagraph } from '../utils/document'
import { orderSuggestedParagraphs } from '../utils/paragraphOrdering'
import { UserData } from '../types/UserData'

const _updateSessionParagraph = (
	documentParagraphComponent: DocumentParagraphComponent,
	sessionParagraphs: SessionParagraph[]
): SessionParagraph[] => {
	sessionParagraphs.forEach(sessionParagraph => {
		const templateParagraph = sessionParagraph.templateComponent as TemplateParagraph
		sessionParagraph.documentComponent =
			sessionParagraph.documentComponent || createDocumentParagraph(templateParagraph, sessionParagraphs)
		const documentParagraph = sessionParagraph.documentComponent as DocumentParagraph
		documentParagraph.documentParagraphComponents.forEach((dpc, idx) => {
			if (dpc.baseTemplateComponent === documentParagraphComponent.baseTemplateComponent) {
				documentParagraph.documentParagraphComponents[idx] = documentParagraphComponent
			}
		})
	})
	return sessionParagraphs
}

export const slice = createSlice({
	name: 'session',
	initialState: {
		suggestedParagraphs: [] as SessionParagraph[],
		selectedTopics: [] as CaseTopic[],
		answeredQuestions: [] as Question[],
		selectedTemplate: null as Template,
		sessionDocument: null as SessionDocument,
		userData: {} as UserData,
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
		updateSessionParagraph: (state, action) => {
			const documentParagraphComponent = action.payload
			state.suggestedParagraphs = _updateSessionParagraph(documentParagraphComponent, state.suggestedParagraphs)
		},
		updateSessionDocument: (state, action) => {
			state.sessionDocument = action.payload
		},
		updateSessionDocumentComponent: (state, action) => {
			const documentParagraphComponent = action.payload
			state.sessionDocument = _updateSessionDocument(documentParagraphComponent, state.sessionDocument)
		},
		updateSelectedTopics: (state, action) => {
			state.selectedTopics = _.compact(action.payload)
		},
		updateSuggestedParagraphs: (state, action) => {
			state.suggestedParagraphs = orderSuggestedParagraphs(action.payload, state.selectedTopics)
		},
		updateAnsweredQuestions: (state, action) => {
			state.answeredQuestions = action.payload
		},
		updateSelectedTemplate: (state, action) => {
			state.selectedTemplate = action.payload
		},
		addAnsweredQuestion: (state, action) => {
			const latestQuestion = action.payload
			state.answeredQuestions.push(latestQuestion)
		},
		removeLastAnsweredQuestion: (state, action) => {
			state.answeredQuestions.pop()
		},
		updateUserData: (state, action) => {
			const updatedUserData = action.payload
			state.userData = {
				...state.userData,
				...updatedUserData,
			}
		},
	},
})

const _updateSessionDocument = (
	documentParagraphComponent: DocumentParagraphComponent,
	sessionDocument: SessionDocument
): SessionDocument => {
	const processSessionDocumentComponent = (sessionDocumentComponent: SessionDocumentComponent) => {
		if (
			sessionDocumentComponent.type === 'TemplateContentSection' ||
			sessionDocumentComponent.type === 'UserContentSection'
		) {
			const sectionComponent = sessionDocumentComponent as SessionDocumentSection
			sectionComponent.sessionDocumentComponents.forEach(sc => processSessionDocumentComponent(sc))
		} else if (sessionDocumentComponent.type === 'Paragraph') {
			const sessionParagraph = sessionDocumentComponent as SessionParagraph
			const documentParagraph = sessionParagraph.documentComponent as DocumentParagraph
			documentParagraph.documentParagraphComponents.forEach((dpc, idx) => {
				if (dpc.baseTemplateComponent === documentParagraphComponent.baseTemplateComponent) {
					documentParagraph.documentParagraphComponents[idx] = documentParagraphComponent
				}
			})
		}
	}

	sessionDocument.sessionDocumentComponents.forEach(sessionDocumentComponent => {
		processSessionDocumentComponent(sessionDocumentComponent)
	})
	sessionDocument.document = createDocument(sessionDocument)

	return sessionDocument
}

export const {
	updateSuggestedParagraphs,
	updateAnsweredQuestions,
	updateSelectedTopics,
	addAnsweredQuestion,
	removeLastAnsweredQuestion,
	selectParagraphs,
	deselectParagraphs,
	updateSelectedTemplate,
	updateSessionParagraph,
	updateSessionDocument,
	updateSessionDocumentComponent,
	updateUserData,
} = slice.actions

export default slice.reducer

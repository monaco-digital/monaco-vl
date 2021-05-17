/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { CaseTopic, DocumentParagraph, Template, DocumentParagraphComponent } from 'api/vl/models';
import _ from 'lodash';
import { UserData } from '../types/UserData';
import {
	SessionDocument,
	SessionParagraph,
	SessionDocumentComponent,
	SessionDocumentSection,
} from '../types/SessionDocument';
import { Question } from '../types/Questions';
import { createDocument } from '../utils/document';
import orderSuggestedParagraphs from '../utils/paragraphOrdering';
import { cdfValues } from '../client/components/common/UserData/CDF1';

const updateSessionDocumentMapper = (
	documentParagraphComponent: DocumentParagraphComponent,
	sessionDocument: SessionDocument,
): SessionDocument => {
	const processSessionDocumentComponent = (sessionDocumentComponent: SessionDocumentComponent) => {
		if (
			sessionDocumentComponent.type === 'TemplateContentSection' ||
			sessionDocumentComponent.type === 'UserContentSection'
		) {
			const sectionComponent = sessionDocumentComponent as SessionDocumentSection;
			sectionComponent.sessionDocumentComponents.forEach(sc => processSessionDocumentComponent(sc));
		} else if (sessionDocumentComponent.type === 'Paragraph') {
			const sessionParagraph = sessionDocumentComponent as SessionParagraph;
			const documentParagraph = sessionParagraph.documentComponent as DocumentParagraph;
			documentParagraph.documentParagraphComponents.forEach((dpc, idx) => {
				if (dpc.baseTemplateComponent === documentParagraphComponent.baseTemplateComponent) {
					documentParagraph.documentParagraphComponents[idx] = documentParagraphComponent;
				}
			});
		}
	};

	sessionDocument.sessionDocumentComponents.forEach(sessionDocumentComponent => {
		processSessionDocumentComponent(sessionDocumentComponent);
	});
	const newSessioonDocument = {
		...sessionDocument,
		document: createDocument(sessionDocument),
	};
	return newSessioonDocument;
};

const updateUserDataFromQuestion = (
	userData: UserData,
	selectedTopics: CaseTopic[],
	payload: any,
	actionType: string,
): UserData => {
	const question = payload as Question;
	switch (actionType) {
		case 'addAnsweredQuestion': {
			if (question?.id === 1) {
				if (selectedTopics.some(({ id }) => id === 'E')) {
					const uData = {
						...userData,
						stillEmployed: cdfValues.stillEmployed.YES,
					};
					return uData;
				}
				if (selectedTopics.some(({ id }) => id === '_NE')) {
					const uData = {
						...userData,
						stillEmployed: cdfValues.stillEmployed.NO,
					};
					return uData;
				}
			} else if (question?.id === 3) {
				if (selectedTopics.some(({ id }) => id === 'M2y')) {
					const uData = {
						...userData,
						yearsEmployed: cdfValues.yearsEmployed.MORE_THAN_2,
					};
					return uData;
				}
				if (selectedTopics.some(({ id }) => id === '2y')) {
					const uData = {
						...userData,
						yearsEmployed: cdfValues.yearsEmployed.LESS_THAN_2,
					};
					return uData;
				}
			}
			break;
		}
		case 'removeLastAnsweredQuestion':
			{
				let yearsEmployed: string;
				let stillEmployed: string;
				if (selectedTopics.some(({ id }) => id === 'E')) {
					stillEmployed = cdfValues.stillEmployed.YES;
				}
				if (selectedTopics.some(({ id }) => id === '_NE')) {
					stillEmployed = cdfValues.stillEmployed.YES;
				}
				if (selectedTopics.some(({ id }) => id === 'M2y')) {
					yearsEmployed = cdfValues.yearsEmployed.MORE_THAN_2;
				}
				if (selectedTopics.some(({ id }) => id === '2y')) {
					yearsEmployed = cdfValues.yearsEmployed.LESS_THAN_2;
				}
				return {
					...userData,
					yearsEmployed,
					stillEmployed,
				};
			}
			break;
		default:
			break;
	}
	return userData;
};

export const slice = createSlice({
	name: 'session',
	initialState: {
		narrative: null as string,
		suggestedParagraphs: [] as SessionParagraph[],
		selectedTopics: [] as CaseTopic[],
		answeredQuestions: [] as Question[],
		selectedTemplate: null as Template,
		currentSessionDocument: null as string,
		sessionDocuments: {
			_WP: null as SessionDocument,
			_GR: null as SessionDocument,
			_ET: null as SessionDocument,
			_RES_CD: null as SessionDocument,
			_RES_CO: null as SessionDocument,
			_RES_I: null as SessionDocument,
			_RES_KM: null as SessionDocument,
		},
		userData: {} as UserData,
	},
	reducers: {
		selectParagraphs: (state, action) => {
			const ids = action.payload;
			state.suggestedParagraphs.forEach(suggestedParagraph => {
				if (ids.includes(suggestedParagraph.templateComponent.id)) {
					suggestedParagraph.isSelected = true;
				}
			});
		},
		deselectParagraphs: (state, action) => {
			const ids = action.payload;
			state.suggestedParagraphs.forEach(suggestedParagraph => {
				if (ids.includes(suggestedParagraph.templateComponent.id)) {
					suggestedParagraph.isSelected = false;
				}
			});
		},
		updateNarrative: (state, action) => {
			state.narrative = action.payload;
			state.userData = {
				...state.userData,
				description: action.payload,
			};
		},
		updateCurrentSessionDocument: (state, action) => {
			state.currentSessionDocument = action.payload;
		},
		updateSessionDocument: (state, action) => {
			const { document, type } = action.payload;
			state.sessionDocuments[type] = document;
		},
		updateSessionDocumentComponent: (state, action) => {
			const { documentParaComponent } = action.payload;
			state.sessionDocuments[state.currentSessionDocument] = updateSessionDocumentMapper(
				documentParaComponent,
				state.sessionDocuments[state.currentSessionDocument],
			);
		},
		updateSelectedTopics: (state, action) => {
			state.selectedTopics = _.compact(action.payload);
		},
		updateSuggestedParagraphs: (state, action) => {
			state.suggestedParagraphs = orderSuggestedParagraphs(action.payload, state.selectedTopics);
		},
		updateAnsweredQuestions: (state, action) => {
			state.answeredQuestions = action.payload;
		},
		updateSelectedTemplate: (state, action) => {
			state.selectedTemplate = action.payload;
		},
		addAnsweredQuestion: (state, action) => {
			const latestQuestion = action.payload;
			state.answeredQuestions.push(latestQuestion);
			state.userData = updateUserDataFromQuestion(
				state.userData,
				state.selectedTopics,
				action.payload,
				'addAnsweredQuestion',
			);
		},
		removeLastAnsweredQuestion: state => {
			state.answeredQuestions.pop();
			state.userData = updateUserDataFromQuestion(
				state.userData,
				state.selectedTopics,
				undefined,
				'removeLastAnsweredQuestion',
			);
		},
		updateUserData: (state, action) => {
			const updatedUserData = action.payload;
			state.userData = {
				...state.userData,
				...updatedUserData,
			};
		},
	},
});

export const {
	updateNarrative,
	updateSuggestedParagraphs,
	updateAnsweredQuestions,
	updateSelectedTopics,
	addAnsweredQuestion,
	removeLastAnsweredQuestion,
	selectParagraphs,
	deselectParagraphs,
	updateSelectedTemplate,
	updateCurrentSessionDocument,
	updateSessionDocument,
	updateSessionDocumentComponent,
	updateUserData,
} = slice.actions;

export default slice.reducer;

/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
	CaseTopic,
	DocumentParagraph,
	Template,
	DocumentParagraphComponent,
	TemplateParagraph,
	Paragraph,
} from 'api/vl/models';
import _ from 'lodash';
import { getQuestion } from 'clustering/questionFlow';
import { UserData } from '../types/UserData';
import {
	SessionDocument,
	SessionParagraph,
	SessionDocumentComponent,
	SessionDocumentSection,
} from '../types/SessionDocument';
import { createDocument } from '../utils/document';
import orderSuggestedParagraphs from '../utils/paragraphOrdering';
import { cdfValues } from '../client/components/common/UserData/CDF1';
import { generateParagraphsByTopics } from './sessionDataThunks';

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

const updateUserDataFromTopics = (userData: UserData, selectedTopics: CaseTopic[]): UserData => {
	let yearsEmployed: string;
	let stillEmployed: string;
	if (selectedTopics.some(({ id }) => id === 'E')) {
		stillEmployed = cdfValues.stillEmployed.YES;
	}
	if (selectedTopics.some(({ id }) => id === '_NE')) {
		stillEmployed = cdfValues.stillEmployed.NO;
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
};

export const slice = createSlice({
	name: 'session',
	initialState: {
		narrative: null as string,
		suggestedParagraphs: [] as SessionParagraph[],
		selectedParagraphs: {
			_ET: null as SessionParagraph[],
			_GR: null as SessionParagraph[],
			_WP: null as SessionParagraph[],
		},
		selectedTopics: [] as CaseTopic[],
		answeredQuestions: [] as number[],
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
			state.sessionDocuments[state.currentSessionDocument] = updateSessionDocumentMapper(
				action.payload,
				state.sessionDocuments[state.currentSessionDocument],
			);
		},
		updateSelectedTopics: (state, action) => {
			state.selectedTopics = _.compact(action.payload);
			state.sessionDocuments = {
				_WP: null,
				_GR: null,
				_ET: null,
				_RES_CD: null,
				_RES_CO: null,
				_RES_I: null,
				_RES_KM: null,
			};
		},
		updateSuggestedParagraphs: (state, action) => {
			state.suggestedParagraphs = orderSuggestedParagraphs(action.payload, state.selectedTopics);
			state.sessionDocuments = {
				_WP: null,
				_GR: null,
				_ET: null,
				_RES_CD: null,
				_RES_CO: null,
				_RES_I: null,
				_RES_KM: null,
			};
		},
		updateAnsweredQuestions: (state, action) => {
			state.answeredQuestions = action.payload;
		},
		updateSelectedTemplate: (state, action) => {
			state.selectedTemplate = action.payload;
		},
		addAnsweredQuestion: (state, action) => {
			const latestQuestionId = action.payload;

			const currentQuestionIndex = state.answeredQuestions.indexOf(latestQuestionId);
			if (currentQuestionIndex === -1) {
				state.answeredQuestions = [...state.answeredQuestions, latestQuestionId];
			} else {
				// re-answering a question invalidates all later answers

				const remainingAnsweredQuestions = state.answeredQuestions.slice(0, currentQuestionIndex);
				const poppedQuestions = state.answeredQuestions.slice(currentQuestionIndex + 1);

				poppedQuestions.forEach(questionId => {
					// unselect all topics selected by the removed questions
					// FIXME - some topics are in multiple questions (e.g. 'P'), and might get removed when they shouldn't

					const question = getQuestion(questionId);
					const optionsToDeselect = question.options.map(option => option.topicId);
					state.selectedTopics = state.selectedTopics.filter(topic => !optionsToDeselect.includes(topic.id));
				});

				state.answeredQuestions = [...remainingAnsweredQuestions, latestQuestionId];
			}
			state.userData = updateUserDataFromTopics(state.userData, state.selectedTopics);
		},
		updateUserData: (state, action) => {
			const updatedUserData = action.payload;
			state.userData = {
				...state.userData,
				...updatedUserData,
			};
		},
	},
	extraReducers: builder => {
		builder.addCase(generateParagraphsByTopics.fulfilled, (state, action) => {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			const { ET_paragraphIds, GR_paragraphIds, WP_paragraphIds } = action.payload;

			let paragraphs: Record<string, Paragraph> = ET_paragraphIds.reduce((hashMap, currentValue) => {
				hashMap[currentValue.id] = { ...currentValue, types: ['_ET'] };
				return hashMap;
			}, {});
			paragraphs = GR_paragraphIds.reduce((hashMap, currentValue) => {
				if (hashMap[currentValue.id]) {
					hashMap[currentValue.id].types.push('_GR');
				} else {
					hashMap[currentValue.id] = { ...currentValue, types: ['_GR'] };
				}
				return hashMap;
			}, paragraphs);
			paragraphs = WP_paragraphIds.reduce((hashMap, currentValue) => {
				if (hashMap[currentValue.id]) {
					hashMap[currentValue.id].types.push('_WP');
				} else {
					hashMap[currentValue.id] = { ...currentValue, types: ['_WP'] };
				}
				return hashMap;
			}, paragraphs);

			state.suggestedParagraphs = Object.values(paragraphs).map(
				paragraph =>
					({
						templateComponent: {
							id: paragraph.id,
							type: 'Paragraph',
							version: 1,
							paragraph,
						} as TemplateParagraph,
						documentComponent: null,
						isSelected: Boolean(paragraph.isAutomaticallyIncluded),
					} as SessionParagraph),
			);
		});
	},
});

export const {
	updateNarrative,
	updateSuggestedParagraphs,
	updateAnsweredQuestions,
	updateSelectedTopics,
	addAnsweredQuestion,
	selectParagraphs,
	deselectParagraphs,
	updateSelectedTemplate,
	updateCurrentSessionDocument,
	updateSessionDocument,
	updateSessionDocumentComponent,
	updateUserData,
} = slice.actions;

export default slice.reducer;

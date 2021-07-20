import { createAsyncThunk } from '@reduxjs/toolkit';
import { gql } from '@apollo/client';
import AppState from './AppState';
import { client } from '../api/vl/graphql';
import { updateNarrative } from './sessionDataSlice';

export const ADD_NARRATIVE_SESSION = gql`
	mutation addNarrative($sessionId: ID!, $narrative: String) {
		addNarrative(sessionId: $sessionId, narrative: $narrative) {
			success
		}
	}
`;

export const SELECT_PARAGRAPHS = gql`
	mutation selectParagraphs($sessionId: ID!, $paragraphIds: [String]) {
		selectParagraphs(sessionId: $sessionId, paragraphIds: $paragraphIds) {
			success
		}
	}
`;

export const ANSWER_QUESTION = gql`
	mutation answerQuestion($sessionId: ID!, $questionId: String!, $selectedTopics: [String]!) {
		answerQuestion(sessionId: $sessionId, questionId: $questionId, selectedTopics: $selectedTopics) {
			success
		}
	}
`;

export const updateNarrativeCall = createAsyncThunk(
	'session/updateNarrativeCall',
	async (narrative: string, thunkAPI) => {
		const state = thunkAPI.getState() as AppState;
		const { dispatch } = thunkAPI;
		dispatch(updateNarrative(narrative));
		const {
			session: { id },
		} = state;
		const {
			data: { addNarrative: addTheNarrative },
		} = await client.mutate<{ addNarrative: { success: boolean } }>({
			mutation: ADD_NARRATIVE_SESSION,
			variables: { sessionId: id, narrative },
		});
		return addTheNarrative;
	},
);

export const selectParagraphsCall = createAsyncThunk('session/selectParagraphsCall', async (_, thunkAPI) => {
	const state = thunkAPI.getState() as AppState;
	const paragraphIds = state.session.suggestedParagraphs
		.filter(paragraph => paragraph.isSelected)
		.map(suggestedParagraph => suggestedParagraph.templateComponent.id);
	const {
		session: { id },
	} = state;
	const {
		data: { selectParagraphs },
	} = await client.mutate<{ selectParagraphs: { success: boolean } }>({
		mutation: SELECT_PARAGRAPHS,
		variables: { sessionId: id, paragraphIds },
	});
	return selectParagraphs;
});

export const answerQuestion = createAsyncThunk(
	'session/answerQuestion',
	async ({ questionId, selectedTopics }: { questionId: string; selectedTopics: string[] }, thunkAPI) => {
		const state = thunkAPI.getState() as AppState;
		const {
			session: { id },
		} = state;
		const {
			data: { answerQuestion: answerQuestionResult },
		} = await client.mutate<{ answerQuestion: { success: boolean } }>({
			mutation: ANSWER_QUESTION,
			variables: { sessionId: id, questionId, selectedTopics },
		});
		return answerQuestionResult;
	},
);

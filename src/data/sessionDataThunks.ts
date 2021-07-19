import { createAsyncThunk } from '@reduxjs/toolkit';
import { gql } from '@apollo/client';

import { fragments } from 'api/vl/fragments';
import { client } from 'api/vl/graphql';
import { Paragraph } from 'api/vl/models';

export const GENERATE_PARAGRAPHS = gql`
	query ($topicIds: [String]!, $narrative: String) {
		generateParagraphsTopics(topicIds: $topicIds, narrative: $narrative) {
			...FParagraph
		}
	}
	${fragments.paragraph}
`;

export const CREATE_SESSION = gql`
	mutation startSession {
		startSession {
			id
		}
	}
`;

export const generateParagraphsByTopics = createAsyncThunk(
	'session/generateParagraphsByTopics',
	async ({ topicIds, narrative }: { topicIds: string[]; narrative: string }) => {
		const {
			data: { generateParagraphsTopics },
		} = await client.query<{ generateParagraphsTopics: Paragraph[] }, { topicIds: string[]; narrative: string }>({
			query: GENERATE_PARAGRAPHS,
			variables: {
				topicIds,
				narrative,
			},
		});

		return generateParagraphsTopics;
	},
);

export const startSession = createAsyncThunk('session/startSession', async _ => {
	console.log('the start session call has been made');
	const {
		data: { startSession: startTheSession },
	} = await client.mutate<{ startSession: { id: string } }>({
		mutation: CREATE_SESSION,
		variables: {},
	});
	console.log('The data returned has been: ', startTheSession);
	return startTheSession;
});

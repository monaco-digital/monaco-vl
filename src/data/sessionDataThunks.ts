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

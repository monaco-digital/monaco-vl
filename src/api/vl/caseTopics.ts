import { CaseTopic } from 'api/vl/models';
import { gql } from '@apollo/client';
import { client } from './graphql';
import { fragments } from './fragments';

const GET_ALL_CASE_TOPICS = gql`
	query {
		getAllCaseTopics {
			...FCaseTopic
		}
	}
	${fragments.caseTopic}
`;

export const getAllCaseTopics = async (): Promise<CaseTopic[]> => {
	try {
		const result = await client.query<any, any>({
			query: GET_ALL_CASE_TOPICS,
		});
		const { data, errors } = result;
		if (!data) {
			const errorString = errors?.join('\n') ?? 'did not get data from server';
			throw new Error(`The error is: ${errorString}`);
		}
		const { getAllCaseTopics: caseTopics } = data;
		return caseTopics;
	} catch (e) {
		// ignore
	}
	return null;
};

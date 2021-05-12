import { gql } from '@apollo/client';

export const caseTopic = gql`
	fragment FCaseTopic on CaseTopic {
		id
		type
		topic
		name
		text
		parentTopics
		subTopics
	}
`;

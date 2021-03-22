import { gql } from '@apollo/client';

export const meta = gql`
	fragment FMeta on Meta {
		created
		updated
	}
`;

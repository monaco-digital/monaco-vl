import { gql } from '@apollo/client'
import { meta } from './misc'

export const caseTopic = gql`
	fragment FCaseTopic on CaseTopic {
		_id
		id
		type
		topic
		name
		text
		parentTopics
		subTopics
		meta {
			...FMeta
		}
	}
	${meta}
`

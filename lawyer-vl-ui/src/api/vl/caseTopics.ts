import { client } from './graphql'
import { gql } from '@apollo/client'
import { fragments } from './fragments'
import { CaseTopic } from '../../data/types'
const GET_ALL_CASE_TOPICS = gql`
	query {
		getAllCaseTopics {
			...FCaseTopic
		}
	}
	${fragments.caseTopic}
`

export const getAllCaseTopics = async (): Promise<CaseTopic[]> => {
	try {
		const result = await client.query<any, any>({
			query: GET_ALL_CASE_TOPICS,
		})
		const { data, errors } = result
		if (!data) {
			const errorString = errors?.join('\n') ?? 'did not get data from server'
			throw new Error(`The error is: ${errorString}`)
		}
		const { getAllCaseTopics: caseTopics } = data
		console.log('The case topics are: ', caseTopics)
		return caseTopics
	} catch (e) {
		console.log('There was an error getting all case topics: ', e)
	}
}

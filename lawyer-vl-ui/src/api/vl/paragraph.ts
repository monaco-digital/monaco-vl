import { Paragraph } from '../../data/types'
import { client } from './graphql'
import { gql } from '@apollo/client'
import { fragments } from './fragments'

const GET_ALL_PARAGRAPHS = gql`
	query {
		getAllParagraphs {
			...FParagraph
		}
	}
	${fragments.paragraph}
`

export const getAllParagraphs = async (): Promise<Paragraph[]> => {
	try {
		const result = await client.query<Paragraph[], undefined>({
			query: GET_ALL_PARAGRAPHS,
		})
		const { data, errors } = result
		if (!data) {
			const errorString = errors?.join('\n') ?? 'did not get data from server'
			throw new Error(`The error is: ${errorString}`)
		}
		return data
	} catch (e) {
		console.log('There was an error getting all paragraphs: ', e)
	}
}

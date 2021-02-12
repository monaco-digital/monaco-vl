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
		const result = await client.query<any, any>({
			query: GET_ALL_PARAGRAPHS,
		})
		const { data, errors } = result
		if (!data) {
			const errorString = errors?.join('\n') ?? 'did not get data from server'
			throw new Error(`The error is: ${errorString}`)
		}
		console.log('The data returned for paras  is: ', data)
		const { getAllParagraphs: allParagraphs } = data
		return allParagraphs
	} catch (e) {
		console.log('There was an error getting all paragraphs: ', e)
	}
}

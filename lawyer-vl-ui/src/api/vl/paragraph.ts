import { TemplateParagraph } from '@monaco-digital/vl-types/lib/main'
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

export const getAllParagraphs = async (): Promise<TemplateParagraph[]> => {
	try {
		const result = await client.query<any, any>({
			query: GET_ALL_PARAGRAPHS,
		})
		const { data, errors } = result
		if (!data) {
			const errorString = errors?.join('\n') ?? 'did not get data from server'
			throw new Error(`The error is: ${errorString}`)
		}
		const { getAllParagraphs: allParagraphs } = data
		/* TODO - Fix the endpoint so that it returns template Paragraphs? */
		return allParagraphs.map(paragraph => {
			return {
				id: paragraph.id,
				type: 'Paragraph',
				version: 1,
				paragraph: paragraph,
			}
		})
	} catch (e) {
		console.log('There was an error getting all paragraphs: ', e)
	}
}

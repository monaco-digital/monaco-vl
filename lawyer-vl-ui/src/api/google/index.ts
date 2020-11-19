//@ts-nocheck
import axios from 'axios'
import nanoid from 'nanoid'
import { updateGoogleDocumentBody } from './utils'
import { Paragraph } from '../../data/types'

const apiKey = 'AIzaSyD5K02Z-M8v3naFEKSZqMwywn1VlScdrF0'
const clientId =
	'206188710944-ajooov15d0cfri82onq1l5p16e30oajg.apps.googleusercontent.com'
const clientSecret = '4LWWhYfoq3kd3GLXns_2hlGe'
const refreshToken =
	'1//04J6CYOWIgGB8CgYIARAAGAQSNwF-L9IrpaMEanSA6hP960edl3NbllpfH5PJwBpz-0LB2iuMLrsd0l_1q8rp3WtmhCrBeDTe_kk'
const grantType = 'refresh_token'

export const createGoogleDocument = (paragraphs: Paragraph[]): any => {
	const id = nanoid()
	const titleTime = new Date().toISOString().slice(0, 16)

	const updatedTemplate = {
		...template,
		documentId: id,
		title: `VL - Letter - ${titleTime} `,
	}

	//delete updatedTemplate.documentId

	updateGoogleDocumentBody(updatedTemplate, paragraphs)

	console.log(
		'The updated google document being returned is 22222: ',
		updatedTemplate
	)

	return updatedTemplate
}

export const callGoogleApi = async (textToInsert: string) => {
	const titleTime = new Date().toISOString().slice(0, 16)
	const doc = {
		title: `VL - Letter - ${titleTime} `,
	}

	//get access token
	const response = await axios.post('https://oauth2.googleapis.com/token', {
		client_id: clientId,
		client_secret: clientSecret,
		grant_type: grantType,
		refresh_token: refreshToken,
	})

	const { data } = response
	const { access_token: accessToken } = data

	//make google doc
	const response1 = await axios.post(
		`https://docs.googleapis.com/v1/documents?key=${apiKey}`,
		doc,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}
	)

	console.log('The response 1 when creating document is: ', response1)
	const {
		data: { documentId },
	} = response1

	const insertDoc = {
		requests: [
			{
				insertText: {
					location: {
						index: 1,
					},
					text: textToInsert,
				},
			},
		],
	}
	const responseUpdate = await axios.post(
		`https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate?key=${apiKey}`,
		insertDoc,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}
	)

	const permissionDoc = {
		role: 'writer',
		type: 'anyone',
	}

	const response2 = await axios.post(
		`https://www.googleapis.com/drive/v3/files/${documentId}/permissions?key=${apiKey}`,
		permissionDoc,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}
	)

	console.log('The response 2 from google drive is: ', response2)

	//get shareable link and log in to console
	const shareableLink = `https://docs.google.com/document/d/${documentId}/edit`

	return shareableLink
}

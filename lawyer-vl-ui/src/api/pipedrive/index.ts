import { getLetterText } from '../../utlis/letter'
import axios from 'axios'

export const submitFormToPipeDrive = async (fields: any) => {
	const {
		name,
		job,
		email,
		phone,
		salary,
		yearsEmployed,
		stillEmployed,
		settlementAgreement,
		selectedTopics,
		paragraphs,
	} = fields

	const body = {
		'call-taken-by': 'virtual lawyer',
		name: name,
		job: job,
		email: email,
		phone: phone,
		'years-employed': yearsEmployed,
		'still-employed': stillEmployed ? 'Yes' : 'No',
		salary: salary,
		'settlement-agreement': settlementAgreement ? 'Yes' : 'No',
		description: getLetterText(selectedTopics, paragraphs),
	}
	return axios.post(
		'https://40ueg9bxdg.execute-api.eu-west-2.amazonaws.com/prod/create-deal',
		body
	)
}

import axios from 'axios';
import { getLetterText } from '../../utils/document';

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
	} = fields;

	const body = {
		'call-taken-by': 'virtual lawyer',
		name,
		job,
		email,
		phone,
		'years-employed': yearsEmployed,
		'still-employed': stillEmployed ? 'Yes' : 'No',
		salary,
		'settlement-agreement': settlementAgreement ? 'Yes' : 'No',
		description: getLetterText(selectedTopics, paragraphs),
	};
	return axios.post('https://40ueg9bxdg.execute-api.eu-west-2.amazonaws.com/prod/create-deal', body);
};

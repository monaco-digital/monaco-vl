import axios from 'axios';
import config from '../../config';
import { UserData } from '../../types/UserData';

export const submitDetails = async (
	data: UserData | { 'settlement-agreement': string; 'still-employed': string; 'years-employed': string },
) => {
	const result = await axios({
		method: 'POST',
		url: config.LAMBDA_URL,
		data,
		headers: {
			'Content-Type': 'application/json',
		},
	});
};

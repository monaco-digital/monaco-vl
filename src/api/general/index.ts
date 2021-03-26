import axios from 'axios';
import config from '../../config';
import { UserData } from '../../types/UserData';

type LambdaUserData =
	| Omit<UserData, 'settlementAgreement' | 'stillEmployed' | 'yearsEmployed'>
	| { 'settlement-agreement': string; 'still-employed': string; 'years-employed': string };

export const submitDetails = async (data: LambdaUserData) => {
	const result = await axios({
		method: 'POST',
		url: config.LAMBDA_URL,
		data,
		headers: {
			'Content-Type': 'application/json',
		},
	});
};

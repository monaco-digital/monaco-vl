import axios from 'axios';
import config from '../../config';
import { UserData } from '../../types/UserData';
import { CDFData } from '../../types/CDFData';

type LambdaUserData =
	| Omit<UserData, 'settlementAgreement' | 'stillEmployed' | 'yearsEmployed'>
	| { 'settlement-agreement': string; 'still-employed': string; 'years-employed': string };

export const submitDetails = async (data: LambdaUserData) => {
	const result = await axios({
		method: 'POST',
		url: `${config.LAMBDA_URL}/process-virtual-lawyer`,
		data,
		headers: {
			'Content-Type': 'application/json',
		},
	});
};

export const createCDF = async (data: CDFData) => {
	const result = await axios({
		method: 'POST',
		url: `${config.LAMBDA_URL}/create-cdf`,
		data,
		headers: {
			'Content-Type': 'application/json',
		},
	});
};

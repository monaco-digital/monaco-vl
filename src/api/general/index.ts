import axios from 'axios';
import config from '../../config';

export const submitDetails = async (data: {
	adviceText?: string;
	letterText?: string;
	topicsList?: string;
	name?: string;
	recipient?: string;
	contactMe?: boolean;
}) => {
	const result = await axios({
		method: 'POST',
		url: config.LAMBDA_URL,
		data,
		headers: {
			'Content-Type': 'application/json',
		},
	});
};

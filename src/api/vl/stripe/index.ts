import axios from 'axios';
import config from '../../../config';

export const createWPLetterPaymentRequest = async (email: string): Promise<string> => {
	try {
		const { VL_STRIPE_URL } = config;
		const url = `${VL_STRIPE_URL}/create-payment-wpletter`;
		const response = await axios.post<{ clientSecret: string }>(url, { email });
		const { data } = response;
		const { clientSecret } = data;
		return clientSecret;
	} catch (e) {
		console.log('There was an error creating a payment request using stripe: ', e);
	}
};

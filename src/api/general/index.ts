import axios from 'axios'
import config from '../../config'
import { UserData } from '../../types/UserData'

export const submitDetails = async (data: UserData) => {
	const result = await axios({
		method: 'POST',
		url: config.LAMBDA_URL,
		data,
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

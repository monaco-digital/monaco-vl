import config from '../../config'
import axios from 'axios'

export const getAllCaseTopics = async () => {
	try {
		const { apiUrl } = config
		const url = apiUrl + '/casetopics/get'
		const response = await axios.get(url)
		const { body } = response
	} catch (e) {
		console.log('There was an error getting all case topics: ', e)
	}
}

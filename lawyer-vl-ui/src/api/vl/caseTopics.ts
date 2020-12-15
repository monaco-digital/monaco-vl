import config from '../../config'
import axios from 'axios'
import { CaseTopic } from '../../data/types'

export const getAllCaseTopics = async () => {
	try {
		const { API_URL } = config
		const url = API_URL + '/casetopics/get'
		const response = await axios.get<CaseTopic[]>(url)
		const { data } = response
		return data
	} catch (e) {
		console.log('There was an error getting all case topics: ', e)
	}
}

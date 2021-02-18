import { CaseTopic } from '@monaco-digital/vl-types/lib/main'
import { grievanceLetter } from './grievanceLetter'
import { stillEmployed } from './stillEmployed'
import { notEmployed } from './notEmployed'
import { responseCompleteDenail } from './responseCompleteDenial'
import { responseCounterOffer } from './responseCounterOffer'
import { responseInvestigating } from './responseInvestigating'
import { responseWantToKeepMe } from './responseWantToKeepMe'

export { adviceLetter } from './adviceLetter'

export const getTemplate = (topics: CaseTopic[]) => {
	console.log('getTemplate', topics)
	try {
		if (topics.find(topic => topic.id === '_GR')) {
			return grievanceLetter
		} else if (topics.find(topic => topic.id === '_RES_CD')) {
			return responseCompleteDenail
		} else if (topics.find(topic => topic.id === '_RES_CO')) {
			return responseCounterOffer
		} else if (topics.find(topic => topic.id === '_RES_I')) {
			return responseInvestigating
		} else if (topics.find(topic => topic.id === '_RES_KM')) {
			return responseWantToKeepMe
		} else if (topics.find(topic => topic.id === 'E')) {
			return stillEmployed
		} else {
			return notEmployed
		}
	} catch (e) {
		// nothing yet
	}
}

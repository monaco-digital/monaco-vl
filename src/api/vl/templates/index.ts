import { CaseTopic } from '@monaco-digital/vl-types/lib/main';
import { grievanceLetter } from './grievanceLetter';
import { stillEmployed } from './stillEmployed';
import { notEmployed } from './notEmployed';
import { responseCompleteDenail } from './responseCompleteDenial';
import { responseCounterOffer } from './responseCounterOffer';
import { responseInvestigating } from './responseInvestigating';
import { responseWantToKeepMe } from './responseWantToKeepMe';

export { adviceLetter } from './adviceLetter';

export const getTemplate = (topics: CaseTopic[]) => {
	console.log('getTemplate', topics);
	try {
		if (topics.find(topic => topic.id === '_GR')) {
			return grievanceLetter;
		}
		if (topics.find(topic => topic.id === '_RES_CD')) {
			return responseCompleteDenail;
		}
		if (topics.find(topic => topic.id === '_RES_CO')) {
			return responseCounterOffer;
		}
		if (topics.find(topic => topic.id === '_RES_I')) {
			return responseInvestigating;
		}
		if (topics.find(topic => topic.id === '_RES_KM')) {
			return responseWantToKeepMe;
		}
		if (topics.find(topic => topic.id === 'E')) {
			return stillEmployed;
		}
		return notEmployed;
	} catch (e) {
		// nothing yet
	}
};

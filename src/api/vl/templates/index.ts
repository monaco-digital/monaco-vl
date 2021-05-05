import { Template } from 'api/vl/models';
import { employed } from './employed';
import { grievanceLetter } from './grievanceLetter';
import { stillEmployed } from './stillEmployed';
import { notEmployed } from './notEmployed';
import { responseCompleteDenail } from './responseCompleteDenial';
import { responseCounterOffer } from './responseCounterOffer';
import { responseInvestigating } from './responseInvestigating';
import { responseWantToKeepMe } from './responseWantToKeepMe';

export { adviceLetter } from './adviceLetter';

export const getTemplate = (select: string): Template => {
	try {
		if (select === '_ET') {
			return employed;
		}
		if (select === '_GR') {
			return grievanceLetter;
		}
		if (select === '_RES_CD') {
			return responseCompleteDenail;
		}
		if (select === '_RES_CO') {
			return responseCounterOffer;
		}
		if (select === '_RES_I') {
			return responseInvestigating;
		}
		if (select === '_RES_KM') {
			return responseWantToKeepMe;
		}
		if (select === 'E') {
			return stillEmployed;
		}
	} catch (e) {
		// nothing yet
	}
	return notEmployed;
};

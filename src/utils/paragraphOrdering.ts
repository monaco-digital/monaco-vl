import { CaseTopic, TemplateParagraph } from '@monaco-digital/vl-types/lib/main';
import _ from 'lodash';
import { SessionParagraph } from '../types/SessionDocument';

/*
	This function should order according to the preferred order of topics, and then by vertical height
*/
const orderSuggestedParagraphs = (
	suggestedParagraphs: SessionParagraph[],
	selectedTopics: CaseTopic[]
): SessionParagraph[] => {
	const selectedTopicIds = selectedTopics.map(topic => topic.id);

	if (selectedTopicIds.includes('T')) {
		/*
			If dismissed:
				Dismissal reason para
				Whistleblowing
				Discrimination
				Victimisation
				Unsafe workplace, e.g. coronavirus (incl DA+DD)
				Bullying/harassment (incl D)
				Performance issues  (incl DD)
				Toxic work environment (incl DD)
				Excessive workload (incl DD)
				Employer owes money
				No written employment terms
				Other
		*/
		const sortOrder = ['T', 'W', 'D', 'V', 'H', 'B', 'P', 'TWE', 'EW', 'M', 'F', 'OBT'];
		return sortParagraphs(suggestedParagraphs, sortOrder);
	}
	if (selectedTopicIds.includes('Rd') || selectedTopicIds.includes('E')) {
		/*
			If Resigned
				Bullying/harassment (incl D)
				Risk of redundancy (incl D + W)
				Suspension (incl D + W)
				Disciplinary proceedings (incl D +W)
				Unsafe workplace, e.g. coronavirus (incl DA+DD)
				Performance issues (incl DD)
				Sickness issues  (incl DD)
				Toxic work environment  (incl DD)
				Excessive workload (incl DD)
				Whistleblowing
				Discrimination
				Victimisation
				Employer owes money
				No written employment terms
				Other
		*/
		const sortOrder = ['B', 'RR', 'Sn', 'Dy', 'H', 'P', 'S', 'TWE', 'EW', 'W', 'D', 'V', 'M', 'F', 'OBT'];
		return sortParagraphs(suggestedParagraphs, sortOrder);
	}

	return suggestedParagraphs;
};

const sortParagraphs = (suggestedParagraphs: SessionParagraph[], sortOrder: string[]): SessionParagraph[] => {
	const comparisonFunction = (a: SessionParagraph, b: SessionParagraph): number => {
		const aParagraph = (a.templateComponent as TemplateParagraph).paragraph;
		const bParagraph = (b.templateComponent as TemplateParagraph).paragraph;
		const aParagraphPrimaryTopic = aParagraph.topicsAllOf?.[0] || aParagraph.topicsOneOf?.[0];
		const bParagraphPrimaryTopic = bParagraph.topicsAllOf?.[0] || bParagraph.topicsOneOf?.[0];
		const aIndex =
			sortOrder.indexOf(aParagraphPrimaryTopic) > -1 ? sortOrder.indexOf(aParagraphPrimaryTopic) : sortOrder.length;
		const bIndex =
			sortOrder.indexOf(bParagraphPrimaryTopic) > -1 ? sortOrder.indexOf(bParagraphPrimaryTopic) : sortOrder.length;

		if (aIndex > bIndex) return 1;
		if (aIndex < bIndex) return -1;
		if (aIndex === bIndex) {
			if (aParagraph.verticalHeight > bParagraph.verticalHeight) return 1;
			if (aParagraph.verticalHeight < bParagraph.verticalHeight) return -1;
		}
		return 0;
	};
	// slice(0) to clone the array to avoid mutating it
	return suggestedParagraphs.slice(0).sort(comparisonFunction);
};

export { orderSuggestedParagraphs };

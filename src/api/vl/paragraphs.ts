import { CaseTopic, TemplateParagraph, Advice } from '@monaco-digital/vl-types/lib/main';
import _ from 'lodash';
import { getAllParagraphs } from './paragraph';
import store from '../../data/store';
import adviceParagraphs from './adviceParagraphs';

interface Rankable {
	topicsOneOf?: string[];
	topicsAllOf?: string[];
	topicsNoneOf?: string[];
}

const matchesAllOf = (paragraph: Rankable, selectedTopicIds): boolean => {
	let matchCount = 0;
	if (paragraph.topicsAllOf.length === 0) return true;
	paragraph.topicsAllOf.forEach(topicId => {
		if (selectedTopicIds.includes(topicId)) {
			matchCount++;
		}
	});
	return matchCount === paragraph.topicsAllOf.length;
};

const matchesOneOf = (paragraph: Rankable, selectedTopicIds): boolean => {
	let matchCount = 0;
	if (paragraph.topicsOneOf.length === 0) return true;
	paragraph.topicsOneOf.forEach(topicId => {
		if (selectedTopicIds.includes(topicId)) {
			matchCount++;
		}
	});
	return matchCount > 0;
};

const matchesNoneOf = (paragraph: Rankable, selectedTopicIds): boolean => {
	let matchCount = 0;
	paragraph.topicsNoneOf.forEach(topicId => {
		if (selectedTopicIds.includes(topicId)) {
			matchCount++;
		}
	});
	return matchCount === 0;
};
const filterAdviceParagraphs = (allParagraphs: Advice[], selectedTopics: CaseTopic[]): Advice[] => {
	if (!selectedTopics || selectedTopics.length === 0) {
		return allParagraphs;
	}

	const selectedTopicIds = selectedTopics.map(topic => topic.id);
	const scoredAndFilteredParas = [];
	allParagraphs.forEach(adviceParagraph => {
		// score to rank how relevant the paragraph is
		const allOf = matchesAllOf(adviceParagraph, selectedTopicIds);
		const oneOf = matchesOneOf(adviceParagraph, selectedTopicIds);
		const noneOf = matchesNoneOf(adviceParagraph, selectedTopicIds);
		const score = allOf && oneOf && noneOf ? 1 : 0;

		if (score > 0) {
			scoredAndFilteredParas.push({
				paragraph: adviceParagraph,
				score,
			});
		}
	});

	return scoredAndFilteredParas.map(p => p.paragraph);
};

const filterSuggestedParagraphs = (
	allParagraphs: TemplateParagraph[],
	selectedTopics: CaseTopic[]
): TemplateParagraph[] => {
	if (!selectedTopics || selectedTopics.length === 0) {
		return allParagraphs;
	}

	const selectedTopicIds = selectedTopics.map(topic => topic.id);
	const scoredAndFilteredParas = [];
	allParagraphs.forEach(templateParagraph => {
		// score to rank how relevant the paragraph is
		const allOf = matchesAllOf(templateParagraph.paragraph, selectedTopicIds);
		const oneOf = matchesOneOf(templateParagraph.paragraph, selectedTopicIds);
		const noneOf = matchesNoneOf(templateParagraph.paragraph, selectedTopicIds);
		const score = allOf && oneOf && noneOf ? 1 : 0;

		if (score > 0) {
			scoredAndFilteredParas.push({
				paragraph: templateParagraph,
				score,
			});
		}
	});

	return scoredAndFilteredParas.map(p => p.paragraph);
};

const includeParentTopics = (selectedTopics: CaseTopic[]) => {
	const state = store.getState();
	const allTopics = state.topics.all;
	const updatedSelectedTopics = [];
	selectedTopics.forEach(selectedTopic => {
		if (selectedTopic.parentTopics?.length > 0) {
			selectedTopic.parentTopics.forEach(parentTopic => {
				updatedSelectedTopics.push(allTopics.find(topic => topic.id === parentTopic));
			});
		}
		updatedSelectedTopics.push(selectedTopic);
	});
	return _.compact(updatedSelectedTopics);
};

const getSuggestedAdviceParagraphs = async (selectedTopics: CaseTopic[]): Promise<Advice[]> => {
	const selectedTopicsAndParents = includeParentTopics(selectedTopics);
	const allAdvice = adviceParagraphs.map(
		rap =>
			({
				id: rap.id,
				text: rap.text,
				topicsOneOf: _.compact(rap.topicsOneOf.split(',').map(s => s.trim())),
				topicsAllOf: _.compact(rap.topicsAllOf.split(',').map(s => s.trim())),
				topicsNoneOf: _.compact(rap.topicsNoneOf.split(',').map(s => s.trim())),
			} as Advice)
	);
	const filtered = filterAdviceParagraphs(allAdvice, selectedTopicsAndParents);
	return filtered;
};

const getSuggestedParagraphs = async (selectedTopics: CaseTopic[]): Promise<TemplateParagraph[]> => {
	const paragraphs = await getAllParagraphs();
	const selectedTopicsAndParents = includeParentTopics(selectedTopics);

	const filtered = filterSuggestedParagraphs(paragraphs, selectedTopicsAndParents);

	return filtered;
};

export { getSuggestedParagraphs, getSuggestedAdviceParagraphs };

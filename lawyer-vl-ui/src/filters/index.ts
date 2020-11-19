import {
	Paragraph,
	ParagraphTopicMapping,
	ParagraphTopics,
	CaseTopic,
	Topics,
} from '../data/types'
import { DSubTopics } from '../data/types'

export const getSuggestedParagraphs = (
	allParagraphs: Paragraph[],
	selectedTopics: { value: string; label?: string }[]
): Paragraph[] => {
	if (!selectedTopics || selectedTopics.length === 0) {
		return allParagraphs
	}

	const selectedTopicIds = selectedTopics.map(topic => topic.value)
	console.log('selectedTopicIds', selectedTopicIds, selectedTopics)
	const scoredAndFilteredParas = []
	allParagraphs.forEach(paragraph => {
		//score to rank how relevant the paragraph is
		const allOf = matchesAllOf(paragraph, selectedTopicIds)
		const oneOf = matchesOneOf(paragraph, selectedTopicIds)
		const noneOf = matchesNoneOf(paragraph, selectedTopicIds)
		let score = (allOf || oneOf) && !noneOf ? 1 : 0
		console.log('score', score, allOf, oneOf, !noneOf)

		if (score > 0) {
			scoredAndFilteredParas.push({
				paragraph,
				score,
			})
		}
	})

	return scoredAndFilteredParas.map(p => p.paragraph)
}

const matchesAllOf = (paragraph: Paragraph, selectedTopicIds) => {
	let matchCount = 0
	paragraph.topicsAllOf.forEach(topicId => {
		if (selectedTopicIds.includes(topicId)) {
			matchCount++
		}
	})
	// return matchCount === paragraph.topicsAllOf.length
	return matchCount > 0
}

const matchesOneOf = (paragraph: Paragraph, selectedTopicIds) => {
	let matchCount = 0
	paragraph.topicsOneOf.forEach(topicId => {
		if (selectedTopicIds.includes(topicId)) {
			matchCount++
		}
	})
	return matchCount > 0
}

const matchesNoneOf = (paragraph: Paragraph, selectedTopicIds) => {
	let matchCount = 0
	paragraph.topicsNoneOf.forEach(topicId => {
		if (selectedTopicIds.includes(topicId)) {
			matchCount++
		}
	})
	return matchCount > 0
}

export const filterByExactTopicMatch = (
	data: Paragraph[],
	topic: string
): Paragraph[] => {
	if (!topic) {
		return data
	}
	return data.filter((value: any) => value.topic === topic)
}

//
// export const filterByOrMatch = (data: Paragraph[], topic: string[]): Paragraph[] => {
//     if (!(topic?.length > 0)) {
//         return data;
//     }
//
//     return data.filter(({ topicList }) => {
//         return topic.some(r => topicList?.indexOf(r) >= 0 )
//     })
// }

const matchAllOfTopics = (ptopics: string[], utopics: string[]): boolean => {
	if (!(ptopics?.length > 0)) {
		return true
	}
	//separate the array and apply logic to D and Rest
	return ptopics.every(r => {
		if (utopics?.indexOf(r) >= 0) {
			return true
		}

		if (utopics.includes[ParagraphTopicMapping.DISCRIMINATION]) {
			if (DSubTopics.includes(r)) {
				return true
			}
		}

		if (r === ParagraphTopicMapping.DISCRIMINATION) {
			if (DSubTopics.some(x => utopics?.indexOf(x) >= 0)) {
				return true
			}
		}

		return false
	})
}

const matchNoneOfTopics = (ptopics: string[], utopics: string[]): boolean => {
	if (!(ptopics?.length > 0)) {
		return true
	}

	//separate the array and apply logic to D and Rest
	return ptopics.every(r => {
		if (utopics?.indexOf(r) >= 0) {
			return false
		}

		if (utopics.includes[ParagraphTopicMapping.DISCRIMINATION]) {
			if (DSubTopics.includes(r)) {
				return false
			}
		}

		if (r === ParagraphTopicMapping.DISCRIMINATION) {
			if (DSubTopics.some(x => utopics?.indexOf(x) >= 0)) {
				return false
			}
		}

		return true
	})
}

export const filterByGeneralMatch = (
	data: Paragraph[],
	topics: string[]
): Paragraph[] => {
	if (!(topics?.length > 0)) {
		return data
	}

	//removing any duplication

	const utopics = [...new Set(topics)]

	const newData = data.filter((value: Paragraph) => {
		const { topicsOneOf = [], topicsAllOf = [], topicsNoneOf = [] } = value

		const eitherFlag =
			topicsOneOf.length > 0
				? topicsOneOf.some(r => utopics?.indexOf(r) >= 0)
				: true

		const mustFlag = matchAllOfTopics(topicsAllOf, utopics)

		const notFlag = matchNoneOfTopics(topicsNoneOf, utopics)

		return eitherFlag && mustFlag && notFlag
	})

	return newData
}

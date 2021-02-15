import { ParagraphTopicMapping } from '../../data/types'
import { CaseTopic, TemplateParagraph } from '@monaco-digital/vl-types/lib/main'
import { DSubTopics } from '../../data/types'
import { getAllParagraphs } from './paragraph'

const getSuggestedParagraphs = async (selectedTopics: CaseTopic[]): Promise<TemplateParagraph[]> => {
	/* const {
		default: { data = {} },
	} = paragraphDataRaw as any
	console.log('paragraphData', data) */
	const paragraphs = await getAllParagraphs()
	console.log('filterSuggestedParagraphs', paragraphs, selectedTopics.length)
	const filtered = filterSuggestedParagraphs(paragraphs, selectedTopics)
	return filtered
}

const filterSuggestedParagraphs = (
	allParagraphs: TemplateParagraph[],
	selectedTopics: CaseTopic[]
): TemplateParagraph[] => {
	if (!selectedTopics || selectedTopics.length === 0) {
		return allParagraphs
	}

	const selectedTopicIds = selectedTopics.map(topic => topic.id)
	console.log('selectedTopicIds', selectedTopicIds, selectedTopics)
	const scoredAndFilteredParas = []
	allParagraphs.forEach(paragraph => {
		//score to rank how relevant the paragraph is
		const allOf = matchesAllOf(paragraph, selectedTopicIds)
		const oneOf = matchesOneOf(paragraph, selectedTopicIds)
		const noneOf = matchesNoneOf(paragraph, selectedTopicIds)
		let score = (allOf || oneOf) && !noneOf ? 1 : 0
		// console.log('score', score, allOf, oneOf, !noneOf)

		if (score > 0) {
			scoredAndFilteredParas.push({
				paragraph,
				score,
			})
		}
	})

	return scoredAndFilteredParas.map(p => p.paragraph)
}

const matchesAllOf = (templateParagraph: TemplateParagraph, selectedTopicIds) => {
	let matchCount = 0
	templateParagraph.paragraph.topicsAllOf.forEach(topicId => {
		if (selectedTopicIds.includes(topicId)) {
			matchCount++
		}
	})
	// return matchCount === paragraph.topicsAllOf.length
	return matchCount > 0
}

const matchesOneOf = (templateParagraph: TemplateParagraph, selectedTopicIds) => {
	let matchCount = 0
	templateParagraph.paragraph.topicsOneOf.forEach(topicId => {
		if (selectedTopicIds.includes(topicId)) {
			matchCount++
		}
	})
	return matchCount > 0
}

const matchesNoneOf = (templateParagraph: TemplateParagraph, selectedTopicIds) => {
	let matchCount = 0
	templateParagraph.paragraph.topicsNoneOf.forEach(topicId => {
		if (selectedTopicIds.includes(topicId)) {
			matchCount++
		}
	})
	return matchCount > 0
}

export const filterByExactTopicMatch = (data: TemplateParagraph[], topic: string): TemplateParagraph[] => {
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

		if (utopics.includes(ParagraphTopicMapping.DISCRIMINATION)) {
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

		if (utopics.includes(ParagraphTopicMapping.DISCRIMINATION)) {
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

export const filterByGeneralMatch = (data: TemplateParagraph[], topics: CaseTopic[]): TemplateParagraph[] => {
	if (!(topics?.length > 0)) {
		return data
	}

	//removing any duplication

	const utopics = [...new Set(topics.map(({ id }) => id))]

	const newData = data.filter((value: TemplateParagraph) => {
		const { topicsOneOf = [], topicsAllOf = [], topicsNoneOf = [] } = value.paragraph
		//@ts-ignore
		const topicsOneOfF = topicsOneOf.filter(x => x !== '')
		//@ts-ignore
		const topicsAllOfF = topicsAllOf.filter(x => x !== '')
		//@ts-ignore
		const topicsNoneOfF = topicsNoneOf.filter(x => x !== '')

		const eitherFlag = topicsOneOfF.length > 0 ? topicsOneOfF.some(r => utopics?.indexOf(r) >= 0) : true

		const mustFlag = matchAllOfTopics(topicsAllOfF, utopics)

		const notFlag = matchNoneOfTopics(topicsNoneOfF, utopics)

		return eitherFlag && mustFlag && notFlag
	})

	/* console.log(
		'filterByGeneralMatch return ',
		filterByGeneralMatch.length,
		'paras'
	) */

	return newData
}

export { getSuggestedParagraphs }

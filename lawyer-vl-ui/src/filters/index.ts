import {
	Paragraph,
	ParagraphTopicMapping,
	ParagraphTopics,
} from '../data/types'
import { DSubTopics } from '../data/types'

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

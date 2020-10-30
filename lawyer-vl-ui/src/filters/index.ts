import {
	Paragraph,
	ParagraphTopicMapping,
	ParagraphTopics,
} from '../data/types'
import { replaceDInArrayOfTopics } from '../utlis/TypeConversion'

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

export const filterByGeneralMatch = (
	data: Paragraph[],
	topics: string[]
): Paragraph[] => {
	if (!(topics?.length > 0)) {
		return data
	}

	//if D has been passed in as list of topics then expand to [DP, DM, DS, DSy, DR, DRn, DA, DD, DMe, DG, DPI, DMI, DV]

	const utopics = [...new Set(replaceDInArrayOfTopics(topics))]

	const newData = data.filter((value: Paragraph) => {
		const { topicsOneOf = [], topicsAllOf = [], topicsNoneOf = [] } = value

		const eitherFlag =
			topicsOneOf.length > 0
				? topicsOneOf.some(r => utopics?.indexOf(r) >= 0)
				: true

		const mustFlag =
			topicsAllOf.length > 0
				? topicsAllOf.every(r => utopics?.indexOf(r) >= 0)
				: true

		const notFlag =
			topicsNoneOf.length > 0
				? topicsNoneOf.every(r => utopics?.indexOf(r) < 0)
				: true

		return eitherFlag && mustFlag && notFlag
	})

	return newData
}

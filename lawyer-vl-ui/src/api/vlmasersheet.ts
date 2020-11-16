//@ts-nocheck
import axios from 'axios'
import {
	Paragraph,
	ParagraphTopicMapping,
	TopicAlgebraOperators,
} from '../data/types'
import { replaceDInArrayOfTopics } from '../utlis/TypeConversion'
import { CustomParagraphs } from '../data/static'
import * as response from './response.json'

export const getData = async (): Promise<any> => {
	//const sheetsUrl =
	//	'https://sheets.googleapis.com/v4/spreadsheets/1xF6OTVysJCQ_MTJEg5uhv2m2WP4xKlln2Py1dI9fTUQ/values/Para%20bank!F6:L?key=AIzaSyCnMRMK2SDglZY5UF__dcUfMC1mGiQnZcQ'
	//const response = await axios.get(sheetsUrl)
	const {
		default: { values = [] },
	} = response
	const filteredValues = values.filter(value => value.length > 0)

	const data = filteredValues
		.map((value, index) => {
			const topicOneOfValue = value[3]
			const topicAllOfValue = value[4]
			const topicNoneOfValue = value[5]

			//disjoin by , trim and convert into an array and convert D to an array to subsets

			const topicsOneOf = (topicOneOfValue
				? topicOneOfValue.split(',')
				: []
			)?.map(topic => topic.trim())

			const topicsAllOf = (topicAllOfValue
				? topicAllOfValue.split(',')
				: []
			)?.map(topic => topic.trim())

			const topicsNoneOf = (topicNoneOfValue
				? topicNoneOfValue.split(',')
				: []
			)?.map(topic => topic.trim())

			const topic = `(${topicOneOfValue ?? ''}) + allOf(${
				topicAllOfValue ?? ''
			}) + !(${topicNoneOfValue ?? ''})`

			const dataPoint: Paragraph = {
				id: index.toString(10),
				summary: value[0],
				paragraph: value[1],
				verticalHeight: value[6],
				topic,
				topicsOneOf,
				topicsAllOf,
				topicsNoneOf,
			}
			return dataPoint
		})
		.filter(paragraph => !!paragraph.paragraph)

	//add custom paragraphs
	//const newData = data.concat(CustomParagraphs);
	return data
}

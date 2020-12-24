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
import * as mvpresponse from './mvpresponse.json'

export const getData = async (): Promise<Paragraph[]> => {
	// const d = mvpresponse.data
	// 	.filter(textThirdPerson => !!textThirdPerson.textThirdPerson)
	// 	.map(p => {
	// 		return {
	// 			id: p.id,
	// 			summary: p.summary,
	// 			textThirdPerson: p.textThirdPerson,
	// 			verticalHeight: p.verticalHeight,
	// 			topic: p.topic,
	// 			topicsOneOf: p.topicsOneOf.split(',') || [],
	// 			topicsAllOf: p.topicsAllOf.split(',') || [],
	// 			topicsNoneOf: p.topicsNoneOf.split(',') || [],
	// 		}
	// 	})
	// console.log('data 1422', d)
	// return d
	//const sheetsUrl =
	//	'https://sheets.googleapis.com/v4/spreadsheets/1xF6OTVysJCQ_MTJEg5uhv2m2WP4xKlln2Py1dI9fTUQ/values/Para%20bank!A2:M?key=AIzaSyCnMRMK2SDglZY5UF__dcUfMC1mGiQnZcQ'
	//const response = await axios.get(sheetsUrl)
	const {
		default: { values = [] },
	} = response
	const filteredValues = values.filter(value => value.length > 0)

	const data = filteredValues
		.map((value, index) => {
			const topicOneOfValue = value[9]
			const topicAllOfValue = value[10]
			const topicNoneOfValue = value[11]

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
				id: value[3],
				summary: value[5],
				textFirstPerson: value[6],
				textThirdPerson: value[7],
				authorFirstPerson: value[1],
				authorThirdPerson: value[8],
				verticalHeight: value[12],
				status: value[0],
				topic,
				topicsOneOf,
				topicsAllOf,
				topicsNoneOf,
			}
			return dataPoint
		})
		.filter(paragraph => !!paragraph.summary)

	//add custom paragraphs
	//const newData = data.concat(CustomParagraphs);
	return data
}

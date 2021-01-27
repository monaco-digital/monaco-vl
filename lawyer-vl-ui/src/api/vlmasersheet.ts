//@ts-nocheck
import axios from 'axios'
import { Paragraph, ParagraphTopicMapping, TopicAlgebraOperators } from '../data/types'
import { replaceDInArrayOfTopics } from '../utlis/TypeConversion'
import { CustomParagraphs } from '../data/static'
import * as response from './response.json'
import * as mvpresponse from './mvpresponse.json'
import { type } from 'os'

export const getData = async (): Promise<Paragraph[]> => {
	// const d = mvpresponse.data
	// 	.filter(paragraph => !!paragraph.paragraph)
	// 	.map(p => {
	// 		return {
	// 			id: p.id,
	// 			summary: p.summary,
	// 			paragraph: p.paragraph,
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
	//	'https://sheets.googleapis.com/v4/spreadsheets/1xF6OTVysJCQ_MTJEg5uhv2m2WP4xKlln2Py1dI9fTUQ/values/Para%20bank!D6:L?key=AIzaSyCnMRMK2SDglZY5UF__dcUfMC1mGiQnZcQ'
	//const response = await axios.get(sheetsUrl)
	const {
		default: { values = [] },
	} = response
	const filteredValues = values.filter(value => value.length > 0)

	const data = filteredValues
		.map((value, index) => {
			const topicOneOfValue = value[6]
			const topicAllOfValue = value[7]
			const topicNoneOfValue = value[8]

			//disjoin by , trim and convert into an array and convert D to an array to subsets

			const topicsOneOf = (topicOneOfValue ? topicOneOfValue.split(',') : [])?.map(topic => topic.trim())

			const topicsAllOf = (topicAllOfValue ? topicAllOfValue.split(',') : [])?.map(topic => topic.trim())

			const topicsNoneOf = (topicNoneOfValue ? topicNoneOfValue.split(',') : [])?.map(topic => topic.trim())

			const topic = `(${topicOneOfValue ?? ''}) + allOf(${topicAllOfValue ?? ''}) + !(${topicNoneOfValue ?? ''})`

			const dataPoint: Paragraph = {
				id: value[0],
				summary: value[2],
				paragraph: value[3],
				verticalHeight: value[9],
				topic,
				topicsOneOf,
				topicsAllOf,
				topicsNoneOf,
				paragraphComponents: [
					{
						id: 321,
						meta: {
							created: 432,
							updated: 434,
						},
						type: 'BulletPoints',
						bulletPoints: [
							{
								id: 'somebulletpointid1',
								placeholder: 'some placeholder goes here1',
								required: false,
								minLength: 0,
								maxLength: 1000,
							},
							{
								id: 'somebulletpointid2',
								placeholder: 'some placeholder goes here2',
								required: false,
								minLength: 0,
								maxLength: 1000,
							},
							{
								id: 'somebulletpointid3',
								placeholder: 'some placeholder goes here3',
								required: false,
								minLength: 0,
								maxLength: 1000,
							},
						],
					},
				],
			}

			return dataPoint
		})
		.filter(paragraph => !!paragraph.paragraph && !!paragraph.summary)

	const hardcodedData = [
		{
			id: 'T2000',
			summary: 'This a summary paragraph object 2',
			verticalHeight: 8,
			topicsOneOf: ['D', 'R'],
			paragraphComponents: [
				{
					id: 'PC2000',
					type: 'StaticText',
					textFirstPerson: 'This is first person text for para PC2000',
				},
				{
					id: 'PC3000',
					type: 'BulletPoints',
					bulletPoints: [
						{
							placeholder: 'Please enter the person involved in the harassment',
							required: true,
							minLength: 1,
							maxLength: 100,
						},
						{
							placeholder: 'Please enter the name of a witness to this',
							required: true,
							minLength: 1,
							maxLength: 100,
						},
						{
							placeholder: 'Please tell us how long this went on for',
							required: true,
							minLength: 1,
							maxLength: 100,
						},
					],
					meta: {
						created: 1611333500439,
						updated: 1611333500439,
					},
				},
			],
			paragraphComponentRefs: ['PC2000', 'PC3000'],
			meta: {
				created: 1611333500439,
				updated: 1611333500439,
			},
		},
		{
			// Preexisting
			id: 'T3000',
			summary: 'This a summary paragraph object 4',
			verticalHeight: 6,
			topicsOneOf: ['D', 'R'],
			paragraphComponents: [
				{
					id: 'PC5000',
					type: 'StaticText',
					textFirstPerson: 'This is first person text for para PC2000',
				},
				{
					id: 'PC6000',
					type: 'BulletPoints',
					bulletPoints: [{}],
					meta: {
						created: 1611333500439,
						updated: 1611333500439,
					},
				},
			],
			paragraphComponentRefs: ['PC5000', 'PC6000'],
			meta: {
				created: 1611333500439,
				updated: 1611333500439,
			},
		},
	]

	//add custom paragraphs
	//const newData = data.concat(CustomParagraphs);
	return hardcodedData
}

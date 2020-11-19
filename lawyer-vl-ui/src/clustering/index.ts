import { Topic } from '../data/types'

export type UITopic = {
	type: 'multi-statement' | 'radio' | 'tags'
	options: { label: string; value?: Topic }[]
}

export type View = {
	screen?: number
	text?: {
		heading: string
		subHeading?: string
	}
	uiTopics?: UITopic[]
}

export type CurrentScreen = {
	screen: number
	options?: Array<{
		label: string
		value?: Topic
	}>
}

export class ViewLogic {
	#screens = []
	#topicsSelected?: (Topic | Topic[])[]

	constructor(topicsSelected?: (Topic | Topic[])[]) {
		this.#topicsSelected = topicsSelected
	}

	getNextView(currentScreen: CurrentScreen): View {
		const { screen, options: selectedOptions } = currentScreen

		switch (screen) {
			case 0: {
				return {
					screen: 1,
					text: {
						heading:
							'Before we start we need to know some of the basic facts about your case.',
						subHeading: 'Select the statement that applies to you.',
					},
					uiTopics: [
						{
							type: 'radio',
							options: [
								{ label: 'I am still employed', value: 'E' },
								{ label: 'I am no longer employed' },
							],
						},
					],
				}
			}

			case 1:
				if (selectedOptions?.find(topic => topic.value === 'E')) {
					return {
						screen: 2,
						text: {
							heading: 'How long have you been employed?',
						},
						uiTopics: [
							{
								type: 'radio',
								options: [
									{ label: 'Less than 2 years', value: '2y' },
									{ label: 'More than 2 years' },
								],
							},
						],
					}
				} else {
					return {
						screen: 4,
						text: {
							heading: 'Select any or all of the statements that apply to you.',
						},
						uiTopics: [
							{
								type: 'multi-statement',
								options: [
									{ label: 'I have been dismissed', value: 'T' },
									{ label: 'I have resigned', value: 'Rd' },
									{ label: 'I was made redundant', value: 'R' },
									{ label: 'I was suspended', value: 'Sn' },
									{ label: 'I failed a performance review', value: 'P' },
								],
							},
						],
					}
				}

			case 2:
				return {
					screen: 3,
					text: {
						heading: 'What’s your situation at work?',
						subHeading:
							'Select any or all of the statements that apply to you.',
					},
					uiTopics: [
						{
							type: 'multi-statement',
							options: [
								{ label: 'I am facing redundancy', value: 'R' },
								{ label: 'I have been suspended', value: 'Sn' },
								{ label: 'I failed a performance review', value: 'P' },
							],
						},
					],
				}

			case 3:
				return {
					screen: 5,
					text: {
						heading: 'What other factors are relevant to your case?',
						subHeading:
							'Select any or all of the statements that apply to you.',
					},
					uiTopics: [
						{
							type: 'tags',
							options: [
								{ label: 'Discrimination', value: 'D' },
								{ label: 'Bullying', value: 'B' },
								{ label: 'Coronavirus', value: 'C' },
								{ label: 'Health & Safety', value: 'H' },
								{ label: 'Whistleblowing', value: 'W' },
								{ label: 'Sickness', value: 'S' },
								{ label: 'Mental Health', value: 'Ml' },
								{ label: 'Money owed', value: 'M' },
								{ label: 'Equal Pay', value: 'EP' },
								{ label: 'Misconduct', value: 'Mt' },
								{ label: 'Grievance', value: 'G' },
							],
						},
					],
				}

			case 4:
				return {
					screen: 5,
					text: {
						heading: 'What other factors are relevant to your case?',
						subHeading:
							'Select any or all of the statements that apply to you.',
					},
					uiTopics: [
						{
							type: 'tags',
							options: [
								{ label: 'Discrimination', value: 'D' },
								{ label: 'Bullying', value: 'B' },
								{ label: 'Coronavirus', value: 'C' },
								{ label: 'Health & Safety', value: 'H' },
								{ label: 'Whistleblowing', value: 'W' },
								{ label: 'Sickness', value: 'S' },
								{ label: 'Mental Health', value: 'Ml' },
								{ label: 'Money owed', value: 'M' },
								{ label: 'Equal Pay', value: 'EP' },
								{ label: 'Misconduct', value: 'Mt' },
								{ label: 'Grievance', value: 'G' },
							],
						},
					],
				}

			case 5:
				if (selectedOptions?.find(topic => topic.value === 'D')) {
					return {
						screen: 6,
						text: {
							heading: 'What are being discriminated for?',
							subHeading:
								'Select any or all of the statements that apply to you.',
						},
						uiTopics: [
							{
								type: 'tags',
								options: [
									{ label: 'Age', value: 'DA' },
									{ label: 'Pregnancy', value: 'DP' },
									{ label: 'Maternity', value: 'DM' },
									{ label: 'Sex', value: 'DS' },
									{ label: 'Sexuality', value: 'DSy' },
									{ label: 'Race', value: 'DR' },
									{ label: 'Religion/Belief', value: 'DRn' },
									{ label: 'Disability', value: 'DD' },
									{ label: 'Marriage/Civil/Partnership', value: 'DMe' },
									{ label: 'Gender/Reassignment', value: 'DG' },
									{ label: 'Political/Philosophical', value: 'DPI' },
									{ label: 'Mental Health', value: 'DMl' },
								],
							},
						],
					}
				} else {
					return {}
				}

			case 6:
				return {}
			default:
				return {}
		}
	}
}

import { CaseTopic, Topic } from '../data/types'
import { Topics } from '../data/types'

export type UITopic = {
	type: 'multi-statement' | 'radio' | 'tags'
	options: CaseTopic[]
}

export type View = {
	screen?: number
	text?: {
		heading: string
		subHeading?: string
	}
	questions?: UITopic
}

export type CurrentScreen = {
	screen: number
	selectedTopics?: CaseTopic[]
}

export class ViewLogic {
	#screens = []
	#topicsSelected?: (Topic | Topic[])[]

	constructor(topicsSelected?: (Topic | Topic[])[]) {
		this.#topicsSelected = topicsSelected
	}

	getNextView(currentScreen: CurrentScreen): View {
		const { screen, selectedTopics } = currentScreen

		switch (screen) {
			case 0: {
				return {
					screen: 1,
					text: {
						heading:
							'Before we start we need to know some of the basic facts about your case.',
						subHeading: 'Select the statement that applies to you.',
					},
					questions: {
						type: 'radio',
						options: [
							Topics.find(topic => topic.id === 'E'),
							Topics.find(topic => topic.id === 'NE'),
						],
					},
				}
			}

			case 1:
				if (selectedTopics?.find(topic => topic.id === 'E')) {
					return {
						screen: 2,
						text: {
							heading: 'How long have you been employed?',
						},
						questions: {
							type: 'radio',
							options: [
								Topics.find(topic => topic.id === '2y'),
								Topics.find(topic => topic.id === 'M2y'),
							],
						},
					}
				} else {
					return {
						screen: 4,
						text: {
							heading: 'Select any or all of the statements that apply to you.',
						},
						questions: {
							type: 'multi-statement',
							options: [
								Topics.find(topic => topic.id === 'T'),
								Topics.find(topic => topic.id === 'Rd'),
								Topics.find(topic => topic.id === 'R'),
								Topics.find(topic => topic.id === 'Sn'),
								Topics.find(topic => topic.id === 'P'),
							],
						},
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
					questions: {
						type: 'multi-statement',
						options: [
							Topics.find(topic => topic.id === 'R'),
							Topics.find(topic => topic.id === 'Sn'),
							Topics.find(topic => topic.id === 'P'),
						],
					},
				}

			case 3:
				return {
					screen: 5,
					text: {
						heading: 'What other factors are relevant to your case?',
						subHeading:
							'Select any or all of the statements that apply to you.',
					},
					questions: {
						type: 'tags',
						options: [
							Topics.find(topic => topic.id === 'D'),
							Topics.find(topic => topic.id === 'B'),
							Topics.find(topic => topic.id === 'C'),
							Topics.find(topic => topic.id === 'H'),
							Topics.find(topic => topic.id === 'W'),
							Topics.find(topic => topic.id === 'S'),
							Topics.find(topic => topic.id === 'Ml'),
							Topics.find(topic => topic.id === 'M'),
							Topics.find(topic => topic.id === 'EP'),
							Topics.find(topic => topic.id === 'Mt'),
							Topics.find(topic => topic.id === 'G'),
						],
					},
				}

			case 4:
				return {
					screen: 5,
					text: {
						heading: 'What other factors are relevant to your case?',
						subHeading:
							'Select any or all of the statements that apply to you.',
					},
					questions: {
						type: 'tags',
						options: [
							Topics.find(topic => topic.id === 'D'),
							Topics.find(topic => topic.id === 'B'),
							Topics.find(topic => topic.id === 'C'),
							Topics.find(topic => topic.id === 'H'),
							Topics.find(topic => topic.id === 'W'),
							Topics.find(topic => topic.id === 'S'),
							Topics.find(topic => topic.id === 'Ml'),
							Topics.find(topic => topic.id === 'M'),
							Topics.find(topic => topic.id === 'EP'),
							Topics.find(topic => topic.id === 'Mt'),
							Topics.find(topic => topic.id === 'G'),
						],
					},
				}

			case 5:
				if (selectedTopics?.find(topic => topic.id === 'D')) {
					return {
						screen: 6,
						text: {
							heading: 'What are being discriminated for?',
							subHeading:
								'Select any or all of the statements that apply to you.',
						},
						questions: {
							type: 'tags',
							options: [
								Topics.find(topic => topic.id === 'DA'),
								Topics.find(topic => topic.id === 'DP'),
								Topics.find(topic => topic.id === 'DM'),
								Topics.find(topic => topic.id === 'DS'),
								Topics.find(topic => topic.id === 'DSy'),
								Topics.find(topic => topic.id === 'DR'),
								Topics.find(topic => topic.id === 'DRn'),
								Topics.find(topic => topic.id === 'DD'),
								Topics.find(topic => topic.id === 'DMe'),
								Topics.find(topic => topic.id === 'DG'),
								Topics.find(topic => topic.id === 'DPI'),
								Topics.find(topic => topic.id === 'DMl'),
							],
						},
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

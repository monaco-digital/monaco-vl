import { CaseTopic, Topic } from '../data/types'
import topicsFinder from './topicFinder'

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
						options: topicsFinder(['E', 'NE']),
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
							options: topicsFinder(['2y', 'M2y']),
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
							options: topicsFinder(['T', 'Rd', 'R', 'Sn', 'P']),
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
						options: topicsFinder(['R', 'Sn', 'P']),
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
						options: topicsFinder([
							'D',
							'B',
							'C',
							'H',
							'W',
							'S',
							'Ml',
							'M',
							'EP',
							'Mt',
							'G',
						]),
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
						options: topicsFinder([
							'D',
							'B',
							'C',
							'H',
							'W',
							'S',
							'Ml',
							'M',
							'EP',
							'Mt',
							'G',
						]),
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
							options: topicsFinder([
								'DA',
								'DP',
								'DM',
								'DS',
								'DSy',
								'DR',
								'DRn',
								'DD',
								'DMe',
								'DG',
								'DPI',
								'DMl',
							]),
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

import { Topic } from '../data/types'

export type UITopic = {
	type: 'checkbox' | 'radio'
	options: { label: string; value?: Topic }[]
}

export type View = {
	screen?: number
	uiTopics?: UITopic[]
}

export type ScreenSelection = {
	screen: number
	options?: string[]
}

export class ViewLogic {
	#screens = []
	#topicsSelected?: (Topic | Topic[])[]

	constructor(topicsSelected?: (Topic | Topic[])[]) {
		this.#topicsSelected = topicsSelected
	}

	getNextView(screenSelection: ScreenSelection): View {
		const { screen, options: selectedOptions } = screenSelection

		switch (screen) {
			case 0: {
				return {
					screen: 1,
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
				if (selectedOptions.includes['E']) {
					return {
						screen: 2,
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
						uiTopics: [
							{
								type: 'checkbox',
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
					uiTopics: [
						{
							type: 'checkbox',
							options: [
								{ label: 'I am facing redundancy', value: 'R' },
								{ label: 'I have been suspended', value: 'Sn' },
								{ label: 'I failed a performance review', value: 'P' },
							],
						},
					],
				}

			case 3:
				//both screen 3 and 4 lead to 5
				return {
					screen: 5,
					uiTopics: [
						{
							type: 'checkbox',
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
				//both screen 3 and 4 lead to 5
				return {
					screen: 5,
					uiTopics: [
						{
							type: 'checkbox',
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
				//if discrimination has been selected return one more screen , otherwise finish
				if (selectedOptions.includes['D']) {
					// return screen to do with discrimination
					return {
						screen: 6,
						uiTopics: [
							{
								type: 'checkbox',
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

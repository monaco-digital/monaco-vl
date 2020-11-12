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
	screenNumber: number
	options?: string[]
}

export class ViewLogic {
	#screens = []
	#topicsSelected = new Set()

	getNextView(screen: number, screenSelection: ScreenSelection): View {
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

			case 2:

			case 3:

			case 4:

			case 5:

			default:
				return {}
		}
	}
}

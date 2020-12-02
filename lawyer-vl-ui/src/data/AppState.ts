import { CaseTopic, Paragraph, Topic } from './types'

export type AppState = {
	paragraphs: {
		all: Paragraph[]
		suggested: Paragraph[]
		selected: Paragraph[]
	}
	topics: {
		selected: CaseTopic[]
	}
	questions: {
		screen: number
		mode: any
		prevState: any
		currentQuestion: any
	}
}

export default AppState

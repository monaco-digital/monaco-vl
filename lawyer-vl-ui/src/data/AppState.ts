import { CaseTopic, Paragraph, Topic, Question } from './types'

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
		mode: string
		prevState: any
		currentQuestion: Question
		answeredQuestions: Question[]
	}
	navigation: {
		path: string
	}
}

export default AppState

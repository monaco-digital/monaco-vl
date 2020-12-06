import { CaseTopic, Paragraph, Question } from './types'
import pages from '../types/navigation'

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
		answeredQuestions: Question[]
	}
	navigation: {
		page: keyof typeof pages
	}
}

export default AppState

import { AuthorPerspective, CaseTopic, Paragraph, Question } from './types'
import pages from '../types/navigation'
import { ParagraphToggle } from '../types/paragraph'

export type AppState = {
	paragraphs: {
		all: Paragraph[]
		suggested: Paragraph[]
		selected: Paragraph[]
		toggle: ParagraphToggle
	}
	topics: {
		all: CaseTopic[]
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
	filters: {
		authorPerspective: AuthorPerspective
	}
}

export default AppState

import { CaseTopic, Paragraph } from './types'
import pages from '../types /navigation'

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
		currentQuestion: any
	}
	navigation: {
		page: keyof typeof pages
	}
}

export default AppState

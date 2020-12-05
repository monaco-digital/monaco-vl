import { CaseTopic, Paragraph, Topic } from './types'
import modes from '../client/state/modes'

type mode = keyof typeof modes

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
		mode: mode
	}
}

export default AppState

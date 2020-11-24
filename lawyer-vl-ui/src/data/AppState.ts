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
}

export default AppState

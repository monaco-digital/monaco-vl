import { Paragraph, Topic } from './types'

export type AppState = {
	paragraphs: {
		all: Paragraph[]
		selected: Paragraph[]
	}
	topics: {
		selected: Topic[]
	}
}

export default AppState

import { CaseTopic, Paragraph, Template } from '@monaco-digital/vl-types/lib/main'
import { Question } from '../types/Questions'
import { SessionDocument, SessionParagraph } from '../types/SessionDocument'
import pages from '../types/navigation'
import { ParagraphToggle } from '../types/paragraph'

export type AppState = {
	session: {
		suggestedParagraphs: SessionParagraph[]
		selectedTopics: CaseTopic[]
		answeredQuestions: Question[]
		selectedTemplate: Template
		sessionDocument: SessionDocument
	}
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
}

export default AppState

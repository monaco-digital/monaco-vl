import { CaseTopic, Template, TemplateSection } from '@monaco-digital/vl-types/lib/main'
import { grievanceLetter } from './grievanceLetter'
import { stillEmployed } from './stillEmployed'
import { notEmployed } from './notEmployed'

export const getTemplate = (topics: CaseTopic[]) => {
	console.log('getTemplate', topics)
	try {
		if (topics.find(topic => topic.id === 'G')) {
			return grievanceLetter
		} else if (topics.find(topic => topic.id === 'E')) {
			return stillEmployed
		} else {
			return notEmployed
		}
	} catch (e) {
		// nothing yet
	}
}

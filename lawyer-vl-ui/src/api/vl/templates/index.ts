import { CaseTopic, Template, TemplateSection } from '@monaco-digital/vl-types/lib/main'
import { adviceLetter } from './adviceLetter'
// import { stillEmployed } from './stillEmployed'
// import { notEmployed } from './notEmployed'
import { grievanceLetter } from './grievanceLetter'

export const getTemplate = (topics: CaseTopic[]) => {
	console.log('getTemplate', topics)
	try {
		if (topics.find(topic => topic.id === 'G')) {
			return grievanceLetter
		} else if (topics.find(topic => topic.id === 'E')) {
			return null // stillEmployed
		} else {
			return null //notEmployed
		}
	} catch (e) {
		// nothing yet
	}
}

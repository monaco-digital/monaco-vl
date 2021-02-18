import { Template, TemplateSection } from '@monaco-digital/vl-types/lib/main'
import { nanoid } from 'nanoid'

export const adviceLetter: Template = {
	id: nanoid(),
	version: 1,
	meta: {
		created: 123123,
		updated: 234234,
	},
	templateComponents: [
		{
			id: 'ADVICE_ADV1',
			version: 1,
			type: 'UserContentSection',
			templateComponents: [],
		} as TemplateSection,
	],
} as Template

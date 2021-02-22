import {
	Template,
	TemplateParagraph,
	StaticText,
	TemplateSection,
	EditableText,
	BulletPoints,
} from '@monaco-digital/vl-types/lib/main'
import { nanoid } from 'nanoid'

export const stillEmployed: Template = {
	id: nanoid(),
	version: 1,
	meta: {
		created: 123123,
		updated: 234234,
	},
	templateComponents: [
		{
			id: nanoid(),
			version: 1,
			type: 'TemplateContentSection',
			templateComponents: [
				{
					id: nanoid(),
					type: 'Paragraph',
					paragraphId: '',
					paragraph: {
						id: nanoid(),
						verticalHeight: 0,
						topicsOneOf: [],
						topicsAllOf: ['All'],
						topicsNoneOf: [],
						paragraphComponents: [
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: 'PRIVATE & CONFIDENTIAL',
							} as StaticText,
						],
					},
				},
				{
					id: nanoid(),
					type: 'Paragraph',
					paragraphId: '',
					paragraph: {
						id: nanoid(),
						verticalHeight: 0,
						topicsOneOf: [],
						topicsAllOf: ['All'],
						topicsNoneOf: [],
						paragraphComponents: [
							{
								id: nanoid(),
								type: 'EditableText',
								placeholder: '[Full name of recipient]',
							} as EditableText,
						],
					},
				},
				{
					id: nanoid(),
					type: 'Paragraph',
					paragraphId: '',
					paragraph: {
						id: nanoid(),
						verticalHeight: 0,
						topicsOneOf: [],
						topicsAllOf: ['All'],
						topicsNoneOf: [],
						paragraphComponents: [
							{
								id: nanoid(),
								type: 'EditableText',
								placeholder: '[Company name]',
							} as EditableText,
						],
					},
				},
				{
					id: nanoid(),
					type: 'Paragraph',
					paragraphId: '',
					paragraph: {
						id: nanoid(),
						verticalHeight: 0,
						topicsOneOf: [],
						topicsAllOf: ['All'],
						topicsNoneOf: [],
						paragraphComponents: [
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: 'By email only to: ',
							} as StaticText,
							{
								id: nanoid(),
								type: 'EditableText',
								placeholder: '[Email]',
							} as EditableText,
						],
					},
				},
				{
					id: nanoid(),
					type: 'Paragraph',
					paragraphId: '',
					paragraph: {
						id: nanoid(),
						verticalHeight: 0,
						topicsOneOf: [],
						topicsAllOf: ['All'],
						topicsNoneOf: [],
						paragraphComponents: [
							{
								id: nanoid(),
								type: 'EditableText',
								placeholder: '[Today]',
							} as EditableText,
						],
					},
				},
				{
					id: nanoid(),
					type: 'Paragraph',
					paragraphId: '',
					paragraph: {
						id: nanoid(),
						verticalHeight: 0,
						topicsOneOf: [],
						topicsAllOf: ['All'],
						topicsNoneOf: [],
						paragraphComponents: [
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: 'Dear Sir or Madam',
							} as StaticText,
						],
					},
				},
				{
					id: nanoid(),
					version: 1,
					type: 'Paragraph',
					paragraphId: '',
					paragraph: {
						id: nanoid(),
						verticalHeight: 0,
						topicsOneOf: [],
						topicsAllOf: ['All'],
						topicsNoneOf: [],
						paragraphComponents: [
							{
								id: nanoid(),
								version: 1,
								type: 'StaticText',
								textFirstPerson: 'Settlement - Without Prejudice Save as to Costs & Subject to Contract',
							} as StaticText,
						],
					},
				},
			] as TemplateParagraph[],
		} as TemplateSection,
		{
			id: nanoid(),
			version: 1,
			type: 'UserContentSection',
			templateComponents: [],
		} as TemplateSection,
		{
			type: 'TemplateContentSection',
			templateComponents: [
				{
					id: nanoid(),
					type: 'Paragraph',
					paragraphId: '',
					paragraph: {
						id: nanoid(),
						verticalHeight: 0,
						topicsOneOf: [],
						topicsAllOf: ['All'],
						topicsNoneOf: [],
						paragraphComponents: [
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson:
									'However, I would prefer to remain on amicable terms and avoid the stress and time of litigation. For that reason, I’m suggesting we agree on the following terms: [edit as appropriate]',
							} as StaticText,
						],
					},
				},
				{
					id: nanoid(),
					type: 'Paragraph',
					paragraphId: '',
					paragraph: {
						id: nanoid(),
						verticalHeight: 0,
						topicsOneOf: [],
						topicsAllOf: ['All'],
						topicsNoneOf: [],
						paragraphComponents: [
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: '- Termination date of ',
							} as StaticText,
							{
								id: nanoid(),
								type: 'EditableText',
								placeholder: '[date]',
							} as EditableText,
						],
					},
				},
				{
					id: nanoid(),
					type: 'Paragraph',
					paragraphId: '',
					paragraph: {
						id: nanoid(),
						verticalHeight: 0,
						topicsOneOf: [],
						topicsAllOf: ['All'],
						topicsNoneOf: [],
						paragraphComponents: [
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: '- Orderly handover',
							} as StaticText,
						],
					},
				},
				{
					id: nanoid(),
					type: 'Paragraph',
					paragraphId: '',
					paragraph: {
						id: nanoid(),
						verticalHeight: 0,
						topicsOneOf: [],
						topicsAllOf: ['All'],
						topicsNoneOf: [],
						paragraphComponents: [
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: '- ',
							} as StaticText,
							{
								id: nanoid(),
								type: 'EditableText',
								placeholder: '[x]',
							} as EditableText,
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: ' months’ notice pay',
							} as StaticText,
						],
					},
				},
				{
					id: nanoid(),
					type: 'Paragraph',
					paragraphId: '',
					paragraph: {
						id: nanoid(),
						verticalHeight: 0,
						topicsOneOf: [],
						topicsAllOf: ['All'],
						topicsNoneOf: [],
						paragraphComponents: [
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: '- Outstanding pay in the sum of ',
							} as StaticText,
							{
								id: nanoid(),
								type: 'EditableText',
								placeholder: '[x]',
							} as EditableText,
						],
					},
				},
				{
					id: nanoid(),
					type: 'Paragraph',
					paragraphId: '',
					paragraph: {
						id: nanoid(),
						verticalHeight: 0,
						topicsOneOf: [],
						topicsAllOf: ['All'],
						topicsNoneOf: [],
						paragraphComponents: [
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: '- No disparaging remarks from either party',
							} as StaticText,
						],
					},
				},
				{
					id: nanoid(),
					type: 'Paragraph',
					paragraphId: '',
					paragraph: {
						id: nanoid(),
						verticalHeight: 0,
						topicsOneOf: [],
						topicsAllOf: ['All'],
						topicsNoneOf: [],
						paragraphComponents: [
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: '- Mutual confidentiality of terms',
							} as StaticText,
						],
					},
				},
				{
					id: nanoid(),
					type: 'Paragraph',
					paragraphId: '',
					paragraph: {
						id: nanoid(),
						verticalHeight: 0,
						topicsOneOf: [],
						topicsAllOf: ['All'],
						topicsNoneOf: [],
						paragraphComponents: [
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: '- Agreed references',
							} as StaticText,
						],
					},
				},
				{
					id: nanoid(),
					type: 'Paragraph',
					paragraphId: '',
					paragraph: {
						id: nanoid(),
						verticalHeight: 0,
						topicsOneOf: [],
						topicsAllOf: ['All'],
						topicsNoneOf: [],
						paragraphComponents: [
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: '- Ex gratia payment of ',
							} as StaticText,
							{
								id: nanoid(),
								type: 'EditableText',
								placeholder: '[x]',
							} as EditableText,
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: " months' gross salary",
							} as StaticText,
						],
					},
				},
				{
					id: nanoid(),
					type: 'Paragraph',
					paragraphId: '',
					paragraph: {
						id: nanoid(),
						verticalHeight: 0,
						topicsOneOf: [],
						topicsAllOf: ['All'],
						topicsNoneOf: [],
						paragraphComponents: [
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson:
									'- Legal fees of £500 (plus VAT) for advice on the terms and effect of a settlement agreement.',
							} as StaticText,
						],
					},
				},
				{
					id: nanoid(),
					type: 'Paragraph',
					paragraphId: '',
					paragraph: {
						id: nanoid(),
						verticalHeight: 0,
						topicsOneOf: [],
						topicsAllOf: ['All'],
						topicsNoneOf: [],
						paragraphComponents: [
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: 'If these terms are agreed, I will agree to waive any employment tribunal claims.',
							} as StaticText,
						],
					},
				},
				{
					id: nanoid(),
					type: 'Paragraph',
					paragraphId: '',
					paragraph: {
						id: nanoid(),
						verticalHeight: 0,
						topicsOneOf: [],
						topicsAllOf: ['All'],
						topicsNoneOf: [],
						paragraphComponents: [
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: 'I look forward to hearing from you.',
							} as StaticText,
						],
					},
				},
				{
					id: nanoid(),
					type: 'Paragraph',
					paragraphId: '',
					paragraph: {
						id: nanoid(),
						verticalHeight: 0,
						topicsOneOf: [],
						topicsAllOf: ['All'],
						topicsNoneOf: [],
						paragraphComponents: [
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: 'Yours faithfully',
							} as StaticText,
						],
					},
				},
				{
					id: nanoid(),
					type: 'Paragraph',
					paragraphId: '',
					paragraph: {
						id: nanoid(),
						verticalHeight: 0,
						topicsOneOf: [],
						topicsAllOf: ['All'],
						topicsNoneOf: [],
						paragraphComponents: [
							{
								id: nanoid(),
								type: 'EditableText',
								placeholder: '[name]',
							} as EditableText,
						],
					},
				},
			] as TemplateParagraph[],
		} as TemplateSection,
	],
} as Template

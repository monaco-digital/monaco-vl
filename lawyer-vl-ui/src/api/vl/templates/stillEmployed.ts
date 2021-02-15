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
	id: 'asdasdasda',
	version: 1,
	meta: {
		created: 123123,
		updated: 234234,
	},
	templateComponents: [
		{
			id: 'qwdqt3t',
			version: 1,
			type: 'TemplateContentSection',
			templateComponents: [
				{
					id: 'A00001',
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
					id: 'A00002',
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
								type: 'BulletPoints',
								bulletPoints: [
									{
										id: 'asda',
										placeholder: '[Full name of recipient]',
										required: false,
										minLength: 1,
										maxLength: 100,
									},
								],
							} as BulletPoints,
						],
					},
				},
				{
					id: 'A00003',
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
								textFirstPerson: '[Company name]',
							} as StaticText,
						],
					},
				},
				{
					id: 'A00004128743',
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
					id: 'A00005',
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
								textFirstPerson: '[Today]',
							} as StaticText,
						],
					},
				},
				{
					id: 'A00006',
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
					id: 'A00007',
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
			type: 'TemplateContentSection',
			templateComponents: [
				{
					id: 'A0009',
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
					id: 'A00010',
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
								textFirstPerson: '-- Termination date of xx',
							} as StaticText,
						],
					},
				},
				{
					id: 'A00011',
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
								textFirstPerson: '-- Orderly handover',
							} as StaticText,
						],
					},
				},
				{
					id: 'A00012',
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
								textFirstPerson: '-- [x] months’ notice pay',
							} as StaticText,
						],
					},
				},
				{
					id: 'A00013',
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
								textFirstPerson: '-- Outstanding pay in the sum of [x]',
							} as StaticText,
						],
					},
				},
				{
					id: 'A00014',
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
								textFirstPerson: '-- No disparaging remarks from either party',
							} as StaticText,
						],
					},
				},
				{
					id: 'A00015',
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
								textFirstPerson: '-- Mutual confidentiality of terms',
							} as StaticText,
						],
					},
				},
				{
					id: 'A00016',
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
								textFirstPerson: '-- Agreed references',
							} as StaticText,
						],
					},
				},
				{
					id: 'A00017',
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
								textFirstPerson: "-- Ex gratia payment of [x] months' gross salary",
							} as StaticText,
						],
					},
				},
				{
					id: 'A00018',
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
									'-- Legal fees of £500 (plus VAT) for advice on the terms and effect of a settlement agreement.',
							} as StaticText,
						],
					},
				},
				{
					id: 'A00019',
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
								id: 'PC2000',
								type: 'StaticText',
								textFirstPerson: 'If these terms are agreed, I will agree to waive any employment tribunal claims.',
							} as StaticText,
						],
					},
				},
				{
					id: 'A00020',
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
					id: 'A00021',
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
					id: 'A00022',
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
								textFirstPerson: '[name]',
							} as StaticText,
						],
					},
				},
			] as TemplateParagraph[],
		} as TemplateSection,
	],
} as Template

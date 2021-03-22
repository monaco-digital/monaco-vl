import {
	Template,
	TemplateParagraph,
	StaticText,
	TemplateSection,
	EditableText,
	BulletPoints,
} from '@monaco-digital/vl-types/lib/main';
import { nanoid } from 'nanoid';

export const grievanceLetter: Template = {
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
					version: 1,
					type: 'Paragraph',
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
					version: 1,
					type: 'Paragraph',
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
								placeholder: '[HR manager]',
							} as EditableText,
						],
					},
				},
				{
					id: nanoid(),
					version: 1,
					type: 'Paragraph',
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
					version: 1,
					type: 'Paragraph',
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
					version: 1,
					type: 'Paragraph',
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
					version: 1,
					type: 'Paragraph',
					paragraph: {
						id: nanoid(),
						version: 1,
						type: 'Paragraph',
						verticalHeight: 0,
						topicsOneOf: [],
						topicsAllOf: ['All'],
						topicsNoneOf: [],
						paragraphComponents: [
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: 'Dear ',
							} as StaticText,
							{
								id: nanoid(),
								type: 'EditableText',
								placeholder: '[HR manager]',
							} as EditableText,
						],
					},
				},
				{
					id: nanoid(),
					version: 1,
					type: 'Paragraph',
					paragraph: {
						id: nanoid(),
						version: 1,
						type: 'Paragraph',
						verticalHeight: 0,
						topicsOneOf: [],
						topicsAllOf: ['All'],
						topicsNoneOf: [],
						paragraphComponents: [
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: 'Formal grievance',
							} as StaticText,
						],
					},
				},
				{
					id: nanoid(),
					version: 1,
					type: 'Paragraph',
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
								textFirstPerson: 'I write to raise a formal grievance.',
							} as StaticText,
						],
					},
				},
				{
					id: nanoid(),
					version: 1,
					type: 'Paragraph',
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
								textFirstPerson: 'My employment started on ',
							} as StaticText,
							{
								id: nanoid(),
								type: 'EditableText',
								placeholder: '[date]',
							} as EditableText,
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: '. I am employed as ',
							} as StaticText,
							{
								id: nanoid(),
								type: 'EditableText',
								placeholder: '[job title]',
							} as EditableText,
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: '. I have enjoyed working for ',
							} as StaticText,
							{
								id: nanoid(),
								type: 'EditableText',
								placeholder: '[company name]',
							} as EditableText,
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: ', but I have unfortunately suffered unfair treatment which I invite you to remedy.',
							} as StaticText,
						],
					},
				},
				{
					id: nanoid(),
					version: 1,
					type: 'Paragraph',
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
								textFirstPerson: 'My complaints are as follows:',
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
			id: nanoid(),
			version: 1,
			type: 'TemplateContentSection',
			templateComponents: [
				{
					id: nanoid(),
					type: 'Paragraph',
					version: 1,
					paragraph: {
						id: nanoid(),
						type: 'Paragraph',
						verticalHeight: 0,
						topicsOneOf: [],
						topicsAllOf: ['All'],
						topicsNoneOf: [],
						paragraphComponents: [
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson:
									'I invite you to take the following action in order to resolve my complaints [provide 3-5 bullet points outlining your desired outcome].:',
							} as StaticText,
							{
								id: nanoid(),
								type: 'BulletPoints',
								bulletPoints: [
									{
										id: nanoid(),
										placeholder: '<desired outcome>',
										required: false,
										minLength: 1,
										maxLength: 100,
									},
									{
										id: nanoid(),
										placeholder: '<desired outcome>',
										required: false,
										minLength: 1,
										maxLength: 100,
									},
									{
										id: nanoid(),
										placeholder: '<desired outcome>',
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
					id: nanoid(),
					type: 'Paragraph',
					version: 1,
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
								textFirstPerson: 'I look forward to hearing from you at your earliest convenience.',
							} as StaticText,
						],
					},
				} as TemplateParagraph,
				{
					id: nanoid(),
					type: 'Paragraph',
					version: 1,
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
								textFirstPerson: 'Yours sincerely',
							} as StaticText,
						],
					},
				},
				{
					id: nanoid(),
					type: 'Paragraph',
					version: 1,
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
} as Template;

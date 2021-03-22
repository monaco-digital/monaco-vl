import {
	Template,
	TemplateParagraph,
	StaticText,
	TemplateSection,
	EditableText,
} from '@monaco-digital/vl-types/lib/main';
import { nanoid } from 'nanoid';

export const responseCompleteDenail: Template = {
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
								placeholder: '[Full name of recipient]',
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
								placeholder: '[name]',
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
								textFirstPerson: 'Without Prejudice Save as to Costs & Subject to Contract',
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
								textFirstPerson: 'Thank you for your email of ',
							} as StaticText,
							{
								id: nanoid(),
								type: 'EditableText',
								placeholder: '[date]',
							} as EditableText,
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: ' in response to my offer of settlement.',
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
								textFirstPerson:
									'I am disappointed that you have not engaged with the substance of my allegations, but just denied wrongdoing. In particular: ',
							} as StaticText,
							{
								id: nanoid(),
								type: 'EditableText',
								maxLength: 10000,
								placeholder: '[add detail as to the most important allegations that weren’t addressed]',
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
								textFirstPerson: 'I urge you to reconsider your position and respond to my offer within the next ',
							} as StaticText,
							{
								id: nanoid(),
								type: 'EditableText',
								placeholder: '[insert number]',
							} as EditableText,
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: ' days.',
							} as StaticText,
						],
					},
				},
			] as TemplateParagraph[],
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
									'If I haven’t heard back from you by then, or if you continue to refuse to negotiate, I will have no choice but to issue a claim at an employment tribunal.',
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

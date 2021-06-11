import { Template, TemplateParagraph, StaticText, TemplateSection, EditableText } from 'api/vl/models';
import { nanoid } from 'nanoid';

export const responseCounterOffer: Template = {
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
								type: 'StaticText',
								textFirstPerson: '[Full name of recipient]',
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
								textFirstPerson: '[Company name]',
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
								textFirstPerson: 'By email only to: ',
							} as StaticText,
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: '[Email]',
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
								textFirstPerson: '[Today]',
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
								type: 'StaticText',
								textFirstPerson: '[name]',
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
								type: 'StaticText',
								textFirstPerson: '[date]',
							} as StaticText,
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
								textFirstPerson: 'I acknowledge your counter-offer of ',
							} as StaticText,
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: '[specify their offer]',
							} as StaticText,
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: ' I propose that we meet in the middle and settle on the following: ',
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
								maxLength: 10000,
								textFirstPerson:
									'[Set out your revised position and add reasons if appropriate, in particular if they’ve given specific reasons for their position]',
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
								textFirstPerson: 'I look forward to hearing from you.',
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
								type: 'StaticText',
								textFirstPerson: '[name]',
							} as StaticText,
						],
					},
				},
			] as TemplateParagraph[],
		} as TemplateSection,
	],
} as Template;

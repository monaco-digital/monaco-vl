import { Template, TemplateSection, TemplateParagraph, StaticText, EditableText } from 'api/vl/models';
import { nanoid } from 'nanoid';

export const employed: Template = {
	id: nanoid(),
	version: 1,
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
								textFirstPerson: 'I started working for the Respondent on ',
							} as StaticText,
							{
								id: nanoid(),
								type: 'EditableText',
								placeholder: '[date]',
							} as EditableText,
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: '. I am still working there. ',
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
								textFirstPerson: 'The Respondent is a ',
							} as StaticText,
							{
								id: nanoid(),
								type: 'EditableText',
								placeholder:
									'[describe the type of organisation (NGO, local authority, small business, large corporation etc)]',
							} as EditableText,
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: '. My job title is ',
							} as StaticText,
							{
								id: nanoid(),
								type: 'EditableText',
								placeholder: '[insert job title]',
							} as EditableText,
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: '. My work duties include ',
							} as StaticText,
							{
								id: nanoid(),
								type: 'EditableText',
								placeholder: '[list your work duties]',
							} as EditableText,
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: '.',
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
								textFirstPerson: 'I am ',
							} as StaticText,
							{
								id: nanoid(),
								type: 'EditableText',
								placeholder:
									"[refer to your age, race, sex, religion etc if relevant to that claim, particularly if your claims include discrimination.  E.g. 'I am a 60 year old Chinese woman' if claiming age, race and sex discrimination]",
							} as EditableText,
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: '.',
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
									'The treatment and actions by the Respondent have had a profound negative effect on me. I experienced ',
							} as StaticText,
							{
								id: nanoid(),
								type: 'EditableText',
								placeholder: '[emotional distress and/or mental health issues]',
							} as EditableText,
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: '. My physical health also deteriorated, in particular ',
							} as StaticText,
							{
								id: nanoid(),
								type: 'EditableText',
								placeholder: '[add detail]',
							} as EditableText,
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: '. I have lost income, in particular ',
							} as StaticText,
							{
								id: nanoid(),
								type: 'EditableText',
								placeholder: '[add detail]',
							} as EditableText,
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: '.',
							} as StaticText,
						],
					},
				},
			] as TemplateParagraph[],
		} as TemplateSection,
	],
} as Template;

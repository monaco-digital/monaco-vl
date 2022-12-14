import { TemplateParagraph, StaticText } from 'api/vl/models';
import { SessionParagraph } from '../types/SessionDocument';

import orderSuggestedParagraphs from './paragraphOrdering';

/*
1
D, B, EW

should be
2,1,0,4,3,7,5,6

2
B, EW, D
4,3,7,5,6,2,1,0

8 paras:
verticalHeight: 3,
topic: '() + allOf(D) + !()',

verticalHeight: 2,
topic: '() + allOf(D) + !()',

verticalHeight: 1,
topic: '() + allOf(D,B,E) + !()',

verticalHeight: 2,
topic: '() + allOf(B,E) + !()',

verticalHeight: 1,
topic: '() + allOf(B) + !()',

verticalHeight: 2,
topic: '() + allOf(EW) + !()',

verticalHeight: 2,
topic: '() + allOf(EW,D,E) + !()',

verticalHeight: 1,
topic: '() + allOf(EW,E) + !()',

*/

const testParagraphs = [
	{
		templateComponent: {
			id: '94mx4lAQDohUMeWLu209G-PAR1',
			type: 'Paragraph',
			version: 1,
			paragraph: {
				id: '94mx4lAQDohUMeWLu209G-PAR1',
				summary: 'My treatment was discriminatory and I have reasons to support that',
				verticalHeight: 3,
				topic: '() + allOf(D) + !()',
				status: '',
				topicsOneOf: [],
				topicsAllOf: ['D'],
				topicsNoneOf: [],

				paragraphComponents: [
					{
						id: '94mx4lAQDohUMeWLu209G-STXT-0',
						type: 'StaticText',
						textFirstPerson:
							"My treatment was due to my [protected characteristic(s)]. That's clear because:\n\n[Explain why. Remember it’s not always obvious why the treatment is discriminatory, however bad it is. Always compare to how someone else of a different sex, race etc was/would have been treated (except for disability where you don't have to compare). Aim to explain the discriminatory reason(s) as clearly as possible.\n\nE.g. ‘There were three of us who lost office keys. I was the only female and the only one disciplined. The two male colleagues didn’t face any consequences.’\n\nNB: you don’t need this paragraph if the examples of bad treatment you provided in the previous paragraph are self-explanatory, e.g. racist or sexist jokes.]\n",
					} as StaticText,
				],
			},
		} as TemplateParagraph,
		documentComponent: null,
		isSelected: false,
		type: 'Paragraph',
	},
	{
		templateComponent: {
			id: 'C9xMpOGoDtGmgcG-xKhW_-PAR1',
			type: 'Paragraph',
			version: 1,
			paragraph: {
				id: 'C9xMpOGoDtGmgcG-xKhW_-PAR1',
				type: 'Paragraph',
				version: 1,
				summary: "My treatment was discriminatory, but I can't really give clear reasons why",
				verticalHeight: 2,
				topic: '() + allOf(D) + !()',
				status: '',
				topicsOneOf: [],
				topicsAllOf: ['D'],
				topicsNoneOf: [],
				paragraphComponents: [
					{
						id: 'C9xMpOGoDtGmgcG-xKhW_-STXT-0',
						type: 'StaticText',
						textFirstPerson:
							"Your actions were motivated by my [insert protected characteristic] as there is no rational explanation to such appalling treatment.\n\n[Use this paragraph if you can't give clear reasons why the treatment was discriminatory.]",
					},
				],
			} as TemplateParagraph,
		},
		documentComponent: null,
		isSelected: false,
		type: 'Paragraph',
	},
	{
		templateComponent: {
			id: '_YG7mBqFZdxtYW908hwp1-PAR1',
			type: 'Paragraph',
			version: 1,
			paragraph: {
				id: '_YG7mBqFZdxtYW908hwp1-PAR1',
				type: 'Paragraph',
				version: 1,
				summary: "I've been harassed and/or discriminated against",
				verticalHeight: 1,
				topic: '() + allOf(D,B,E) + !()',
				status: 'Live',
				topicsOneOf: [],
				topicsAllOf: ['D', 'B', 'E'],
				topicsNoneOf: [],
				paragraphComponents: [
					{
						id: '_YG7mBqFZdxtYW908hwp1-STXT-0',
						type: 'StaticText',
						textFirstPerson:
							"I’ve been subjected to [protected characteristic(s)] harassment and/or direct discrimination, in particular:\n\n[provide up to 3 bullet points of strong, recent examples - try to keep them within the last 2-3 months, if possible].\n\nMy treatment is due to my [protected characteristic(s)]. That's clear because:\n\n[Explain why. Remember it’s not always obvious why the treatment is discriminatory, however bad it is. Always compare to how someone else of a different sex, race etc was/would have been treated (except for disability where you don't have to compare). Aim to explain the discriminatory reason(s) as clearly as possible. E.g. ‘There were three of us who lost office keys. I was the only female and the only one disciplined. The two male colleagues didn’t face any consequences.’ NB: you don’t need this paragraph if the examples of bad treatment you provided in the previous paragraph are self-explanatory, e.g. racist or sexist jokes.]",
					},
				],
			} as TemplateParagraph,
		},
		documentComponent: null,
		isSelected: false,
		type: 'Paragraph',
	},
	{
		templateComponent: {
			id: 'YwKQN819SvjcKs2nJtvrT-PAR1',
			type: 'Paragraph',
			version: 1,
			paragraph: {
				id: 'YwKQN819SvjcKs2nJtvrT-PAR1',
				type: 'Paragraph',
				version: 1,
				summary: "I am disadvantaged by one of the employer's policies or procedures",
				verticalHeight: 2,
				topic: '() + allOf(B,E) + !()',
				status: 'Live',
				topicsOneOf: [],
				topicsAllOf: ['B', 'E'],
				topicsNoneOf: [],
				paragraphComponents: [
					{
						id: 'YwKQN819SvjcKs2nJtvrT-STXT-0',
						type: 'StaticText',
						textFirstPerson:
							'Your practice of [explain the practice] has placed me at a disadvantage because of my [insert relevant protected characteristic]. This is indirect discrimination.\n\n[Add detail, explaining how the employer’s seemingly neutral policy or practice affects people of your protected characteristic. Bullet points might be a useful way to show that.]\n',
					},
				],
			} as TemplateParagraph,
		},
		documentComponent: null,
		isSelected: false,
		type: 'Paragraph',
	},
	{
		templateComponent: {
			id: 'LGjnV1dp4Zbl90lS5CRqa-PAR1',
			type: 'Paragraph',
			version: 1,
			paragraph: {
				id: 'LGjnV1dp4Zbl90lS5CRqa-PAR1',
				type: 'Paragraph',
				version: 1,
				summary: 'I have a physical or mental condition',
				verticalHeight: 1,
				topic: '() + allOf(B) + !()',
				status: 'Live',
				topicsOneOf: [],
				topicsAllOf: ['B'],
				topicsNoneOf: [],
				paragraphComponents: [
					{
						id: 'LGjnV1dp4Zbl90lS5CRqa-STXT-0',
						type: 'StaticText',
						textFirstPerson:
							'[As you’re aware,] I have [condition name(s)], which is a disability. [My absence from work on [dates] was caused by my disability.]',
					},
				],
			} as TemplateParagraph,
		},
		documentComponent: null,
		isSelected: false,
		type: 'Paragraph',
	},
	{
		templateComponent: {
			id: 'qI-8n3OU749To0TTuTk39-PAR1',
			type: 'Paragraph',
			version: 1,
			paragraph: {
				id: 'qI-8n3OU749To0TTuTk39-PAR1',
				type: 'Paragraph',
				version: 1,
				summary: "They didn't consider making reasonable adjustments for my condition",
				verticalHeight: 2,
				topic: '() + allOf(EW) + !()',
				status: 'Live',
				topicsOneOf: [],
				topicsAllOf: ['EW'],
				topicsNoneOf: [],
				paragraphComponents: [
					{
						id: 'qI-8n3OU749To0TTuTk39-STXT-0',
						type: 'StaticText',
						textFirstPerson:
							'You didn’t consider making reasonable adjustments for me, as required by the Equality Act 2010 [add detail if possible - what reasonable adjustments could’ve been helpful?].',
					},
				],
			} as TemplateParagraph,
		},
		documentComponent: null,
		isSelected: false,
		type: 'Paragraph',
	},
	{
		templateComponent: {
			id: 'oGd2rfp1se16FAlWjyzE5-PAR1',
			type: 'Paragraph',
			version: 1,
			paragraph: {
				id: 'oGd2rfp1se16FAlWjyzE5-PAR1',
				type: 'Paragraph',
				version: 1,
				summary: 'The disciplinary process against me is discriminatory',
				verticalHeight: 2,
				topic: '() + allOf(EW,D,E) + !()',
				status: 'Live',
				topicsOneOf: [],
				topicsAllOf: ['EW', 'D', 'E'],
				topicsNoneOf: [],
				paragraphComponents: [
					{
						id: 'oGd2rfp1se16FAlWjyzE5-STXT-0',
						type: 'StaticText',
						textFirstPerson:
							"The disciplinary process against me amounts to [protected characteristic] discrimination. This is clear because: [give clear reasons why, e.g. 'three employees lost office keys. I was the only non-white person out of the three and the only one to face disciplinary proceedings for this']. ",
					},
				],
			} as TemplateParagraph,
		},
		documentComponent: null,
		isSelected: false,
		type: 'Paragraph',
	},
	{
		templateComponent: {
			id: 'A6pqbo7kmWdAD8Cz0cVPN-PAR1',
			type: 'Paragraph',
			version: 1,
			paragraph: {
				id: 'A6pqbo7kmWdAD8Cz0cVPN-PAR1',
				type: 'Paragraph',
				version: 1,
				summary: 'The disciplinary process against me is unjustified or unfair',
				verticalHeight: 1,
				topic: '() + allOf(EW,E) + !()',
				status: 'Live',
				topicsOneOf: [],
				topicsAllOf: ['EW', 'E'],
				topicsNoneOf: [],
				paragraphComponents: [
					{
						id: 'A6pqbo7kmWdAD8Cz0cVPN-STXT-0',
						type: 'StaticText',
						textFirstPerson:
							"The disciplinary process against me is unjustified and unfair, and any resulting disciplinary action would clearly be unfair. In particular: [add up to three bullet points with the strongest reasons that it is unfair. Examples: lack of evidence; that even if proven, the action wasn't misconduct; bias. Try to explain your reasons.]",
					},
				],
			} as TemplateParagraph,
		},
		documentComponent: null,
		isSelected: false,
		type: 'Paragraph',
	},
] as SessionParagraph[];

describe('Paragraph ordering', () => {
	/* Anastasia to provide more scenarios to test */

	// ['T', 'W', 'D', 'V', 'H', 'B', 'P', 'TWE', 'EW', 'M', 'F', 'OBT']
	test('Order when dismissed', () => {
		const selectedTopics = [{ id: 'T' }];
		const suggestedParagraphs = testParagraphs;
		const ordered = orderSuggestedParagraphs(suggestedParagraphs, selectedTopics);
		expect(ordered[0]).toEqual(suggestedParagraphs[2]);
		expect(ordered[1]).toEqual(suggestedParagraphs[1]);
		expect(ordered[2]).toEqual(suggestedParagraphs[0]);
		expect(ordered[3]).toEqual(suggestedParagraphs[4]);
		expect(ordered[4]).toEqual(suggestedParagraphs[3]);
		expect(ordered[5]).toEqual(suggestedParagraphs[7]);
		expect(ordered[6]).toEqual(suggestedParagraphs[5]);
		expect(ordered[7]).toEqual(suggestedParagraphs[6]);
	});

	// ['B', 'RR', 'Sn', 'Dy', 'H', 'P', 'S', 'TWE', 'EW', 'W', 'D', 'V', 'M', 'F', 'OBT']
	test('Order when employed', () => {
		const selectedTopics = [{ id: 'E' }];
		const suggestedParagraphs = testParagraphs;
		const ordered = orderSuggestedParagraphs(suggestedParagraphs, selectedTopics);
		expect(ordered[0]).toEqual(suggestedParagraphs[4]);
		expect(ordered[1]).toEqual(suggestedParagraphs[3]);
		expect(ordered[2]).toEqual(suggestedParagraphs[7]);
		expect(ordered[3]).toEqual(suggestedParagraphs[5]);
		expect(ordered[4]).toEqual(suggestedParagraphs[6]);
		expect(ordered[5]).toEqual(suggestedParagraphs[2]);
		expect(ordered[6]).toEqual(suggestedParagraphs[1]);
		expect(ordered[7]).toEqual(suggestedParagraphs[0]);
	});
});

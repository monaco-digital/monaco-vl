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

const testParagraphs = ([
	{
		templateComponent: {
			id: '94mx4lAQDohUMeWLu209G-PAR1',
			type: 'Paragraph',
			version: 1,
			paragraph: {
				__typename: 'Paragraph',
				_id: '603d2115d116fb1079064ac9',
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
						__typename: 'StaticText',
						_id: '603d2115d116fb1079064aca',
						id: '94mx4lAQDohUMeWLu209G-STXT-0',
						type: 'StaticText',
						textFirstPerson:
							"My treatment was due to my [protected characteristic(s)]. That's clear because:\n\n[Explain why. Remember it’s not always obvious why the treatment is discriminatory, however bad it is. Always compare to how someone else of a different sex, race etc was/would have been treated (except for disability where you don't have to compare). Aim to explain the discriminatory reason(s) as clearly as possible.\n\nE.g. ‘There were three of us who lost office keys. I was the only female and the only one disciplined. The two male colleagues didn’t face any consequences.’\n\nNB: you don’t need this paragraph if the examples of bad treatment you provided in the previous paragraph are self-explanatory, e.g. racist or sexist jokes.]\n",
						textThirdPerson:
							"Our client's treatment was due to their [protected characteristic(s)]. That's clear because:\n\n[Explain why. Remember it’s not always obvious why the treatment is discriminatory, however bad it is. Always compare to how someone else of a different sex, race etc was/would have been treated (except for disability where you don't have to compare). Aim to explain the discriminatory reason(s) as clearly as possible.\n\nE.g. ‘There were three of us who lost office keys. I was the only female and the only one disciplined. The two male colleagues didn’t face any consequences.’\n\nNB: you don’t need this paragraph if the examples of bad treatment you provided in the previous paragraph are self-explanatory, e.g. racist or sexist jokes.]\n",
						meta: { __typename: 'Meta', created: null, updated: 1615042011198 },
					},
				],
				paragraphComponentRefs: ['94mx4lAQDohUMeWLu209G-STXT-0'],
				meta: { __typename: 'Meta', created: null, updated: 1615042011170 },
			},
		},
		documentComponent: null,
		isSelected: false,
	},
	{
		templateComponent: {
			id: 'C9xMpOGoDtGmgcG-xKhW_-PAR1',
			type: 'Paragraph',
			version: 1,
			paragraph: {
				__typename: 'Paragraph',
				_id: '603d2115d116fb1079064acc',
				id: 'C9xMpOGoDtGmgcG-xKhW_-PAR1',
				summary: "My treatment was discriminatory, but I can't really give clear reasons why",
				verticalHeight: 2,
				topic: '() + allOf(D) + !()',
				status: '',
				topicsOneOf: [],
				topicsAllOf: ['D'],
				topicsNoneOf: [],
				paragraphComponents: [
					{
						__typename: 'StaticText',
						_id: '603d2115d116fb1079064acb',
						id: 'C9xMpOGoDtGmgcG-xKhW_-STXT-0',
						type: 'StaticText',
						textFirstPerson:
							"Your actions were motivated by my [insert protected characteristic] as there is no rational explanation to such appalling treatment.\n\n[Use this paragraph if you can't give clear reasons why the treatment was discriminatory.]",
						textThirdPerson:
							"Your actions were motivated by our client's [insert protected characteristic] as there is no rational explanation to such appalling treatment.\n\n[Use this paragraph if you can't give clear reasons why the treatment was discriminatory.]",
						meta: { __typename: 'Meta', created: null, updated: 1615042011206 },
					},
				],
				paragraphComponentRefs: ['C9xMpOGoDtGmgcG-xKhW_-STXT-0'],
				meta: { __typename: 'Meta', created: null, updated: 1615042011206 },
			},
		},
		documentComponent: null,
		isSelected: false,
	},
	{
		templateComponent: {
			id: '_YG7mBqFZdxtYW908hwp1-PAR1',
			type: 'Paragraph',
			version: 1,
			paragraph: {
				__typename: 'Paragraph',
				_id: '603d2115d116fb1079064acf',
				id: '_YG7mBqFZdxtYW908hwp1-PAR1',
				summary: "I've been harassed and/or discriminated against",
				verticalHeight: 1,
				topic: '() + allOf(D,B,E) + !()',
				status: 'Live',
				topicsOneOf: [],
				topicsAllOf: ['D', 'B', 'E'],
				topicsNoneOf: [],
				paragraphComponents: [
					{
						__typename: 'StaticText',
						_id: '603d2115d116fb35f64fe1fb',
						id: '_YG7mBqFZdxtYW908hwp1-STXT-0',
						type: 'StaticText',
						textFirstPerson:
							"I’ve been subjected to [protected characteristic(s)] harassment and/or direct discrimination, in particular:\n\n[provide up to 3 bullet points of strong, recent examples - try to keep them within the last 2-3 months, if possible].\n\nMy treatment is due to my [protected characteristic(s)]. That's clear because:\n\n[Explain why. Remember it’s not always obvious why the treatment is discriminatory, however bad it is. Always compare to how someone else of a different sex, race etc was/would have been treated (except for disability where you don't have to compare). Aim to explain the discriminatory reason(s) as clearly as possible. E.g. ‘There were three of us who lost office keys. I was the only female and the only one disciplined. The two male colleagues didn’t face any consequences.’ NB: you don’t need this paragraph if the examples of bad treatment you provided in the previous paragraph are self-explanatory, e.g. racist or sexist jokes.]",
						textThirdPerson:
							'Our client has been been subjected to [protected characteristic(s)] harassment and/or direct discrimination, in particular:\n\n[provide up to 3 bullet points of strong, recent examples - try to keep them within the last 2-3 months, if possible]. ',
						meta: { __typename: 'Meta', created: null, updated: 1615042011463 },
					},
				],
				paragraphComponentRefs: ['_YG7mBqFZdxtYW908hwp1-STXT-0'],
				meta: { __typename: 'Meta', created: null, updated: 1615042011474 },
			},
		},
		documentComponent: null,
		isSelected: false,
	},
	{
		templateComponent: {
			id: 'YwKQN819SvjcKs2nJtvrT-PAR1',
			type: 'Paragraph',
			version: 1,
			paragraph: {
				__typename: 'Paragraph',
				_id: '603d2115d116fb35f64fe1fc',
				id: 'YwKQN819SvjcKs2nJtvrT-PAR1',
				summary: "I am disadvantaged by one of the employer's policies or procedures",
				verticalHeight: 2,
				topic: '() + allOf(B,E) + !()',
				status: 'Live',
				topicsOneOf: [],
				topicsAllOf: ['B', 'E'],
				topicsNoneOf: [],
				paragraphComponents: [
					{
						__typename: 'StaticText',
						_id: '603d2115d116fb35f64fe1fd',
						id: 'YwKQN819SvjcKs2nJtvrT-STXT-0',
						type: 'StaticText',
						textFirstPerson:
							'Your practice of [explain the practice] has placed me at a disadvantage because of my [insert relevant protected characteristic]. This is indirect discrimination.\n\n[Add detail, explaining how the employer’s seemingly neutral policy or practice affects people of your protected characteristic. Bullet points might be a useful way to show that.]\n',
						textThirdPerson:
							'Your practice of [explain the practice] has placed our client at a disadvantage because of their [insert relevant protected characteristic]. This is indirect discrimination.\n\n[Add detail, explaining how the employer’s seemingly neutral policy or practice affects people of your protected characteristic. Bullet points might be a useful way to show that.]\n',
						meta: { __typename: 'Meta', created: null, updated: 1615042011562 },
					},
				],
				paragraphComponentRefs: ['YwKQN819SvjcKs2nJtvrT-STXT-0'],
				meta: { __typename: 'Meta', created: null, updated: 1615042011561 },
			},
		},
		documentComponent: null,
		isSelected: false,
	},
	{
		templateComponent: {
			id: 'LGjnV1dp4Zbl90lS5CRqa-PAR1',
			type: 'Paragraph',
			version: 1,
			paragraph: {
				__typename: 'Paragraph',
				_id: '603d2117d116fb35f64fe1ff',
				id: 'LGjnV1dp4Zbl90lS5CRqa-PAR1',
				summary: 'I have a physical or mental condition',
				verticalHeight: 1,
				topic: '() + allOf(B) + !()',
				status: 'Live',
				topicsOneOf: [],
				topicsAllOf: ['B'],
				topicsNoneOf: [],
				paragraphComponents: [
					{
						__typename: 'StaticText',
						_id: '603d2116d116fb35f64fe1fe',
						id: 'LGjnV1dp4Zbl90lS5CRqa-STXT-0',
						type: 'StaticText',
						textFirstPerson:
							'[As you’re aware,] I have [condition name(s)], which is a disability. [My absence from work on [dates] was caused by my disability.]',
						textThirdPerson:
							'[As you’re aware,] our client has [condition name(s)], which is a disability. [Their absence from work on [dates] was caused by their disability.]',
						meta: { __typename: 'Meta', created: null, updated: 1615042011600 },
					},
				],
				paragraphComponentRefs: ['LGjnV1dp4Zbl90lS5CRqa-STXT-0'],
				meta: { __typename: 'Meta', created: null, updated: 1615042011598 },
			},
		},
		documentComponent: null,
		isSelected: false,
	},
	{
		templateComponent: {
			id: 'qI-8n3OU749To0TTuTk39-PAR1',
			type: 'Paragraph',
			version: 1,
			paragraph: {
				__typename: 'Paragraph',
				_id: '603d2117d116fb1079064ad0',
				id: 'qI-8n3OU749To0TTuTk39-PAR1',
				summary: "They didn't consider making reasonable adjustments for my condition",
				verticalHeight: 2,
				topic: '() + allOf(EW) + !()',
				status: 'Live',
				topicsOneOf: [],
				topicsAllOf: ['EW'],
				topicsNoneOf: [],
				paragraphComponents: [
					{
						__typename: 'StaticText',
						_id: '603d2117d116fb35f64fe200',
						id: 'qI-8n3OU749To0TTuTk39-STXT-0',
						type: 'StaticText',
						textFirstPerson:
							'You didn’t consider making reasonable adjustments for me, as required by the Equality Act 2010 [add detail if possible - what reasonable adjustments could’ve been helpful?].',
						textThirdPerson:
							'You didn’t consider making reasonable adjustments for our client, as required by the Equality Act 2010 [add detail if possible - what reasonable adjustments could’ve been helpful?].',
						meta: { __typename: 'Meta', created: null, updated: 1615042011637 },
					},
				],
				paragraphComponentRefs: ['qI-8n3OU749To0TTuTk39-STXT-0'],
				meta: { __typename: 'Meta', created: null, updated: 1615042011646 },
			},
		},
		documentComponent: null,
		isSelected: false,
	},
	{
		templateComponent: {
			id: 'oGd2rfp1se16FAlWjyzE5-PAR1',
			type: 'Paragraph',
			version: 1,
			paragraph: {
				__typename: 'Paragraph',
				_id: '603d2117d116fb1079064ad5',
				id: 'oGd2rfp1se16FAlWjyzE5-PAR1',
				summary: 'The disciplinary process against me is discriminatory',
				verticalHeight: 2,
				topic: '() + allOf(EW,D,E) + !()',
				status: 'Live',
				topicsOneOf: [],
				topicsAllOf: ['EW', 'D', 'E'],
				topicsNoneOf: [],
				paragraphComponents: [
					{
						__typename: 'StaticText',
						_id: '603d2117d116fb35f64fe203',
						id: 'oGd2rfp1se16FAlWjyzE5-STXT-0',
						type: 'StaticText',
						textFirstPerson:
							"The disciplinary process against me amounts to [protected characteristic] discrimination. This is clear because: [give clear reasons why, e.g. 'three employees lost office keys. I was the only non-white person out of the three and the only one to face disciplinary proceedings for this']. ",
						textThirdPerson:
							"The disciplinary process against our client amounts to [protected characteristic] discrimination. This is clear because: [give clear reasons why, e.g. 'three employees lost office keys. I was the only non-white person out of the three and the only one to face disciplinary proceedings for this']. ",
						meta: { __typename: 'Meta', created: null, updated: 1615042011803 },
					},
				],
				paragraphComponentRefs: ['oGd2rfp1se16FAlWjyzE5-STXT-0'],
				meta: { __typename: 'Meta', created: null, updated: 1615042011804 },
			},
		},
		documentComponent: null,
		isSelected: false,
	},
	{
		templateComponent: {
			id: 'A6pqbo7kmWdAD8Cz0cVPN-PAR1',
			type: 'Paragraph',
			version: 1,
			paragraph: {
				__typename: 'Paragraph',
				_id: '603d2117d116fb35f64fe204',
				id: 'A6pqbo7kmWdAD8Cz0cVPN-PAR1',
				summary: 'The disciplinary process against me is unjustified or unfair',
				verticalHeight: 1,
				topic: '() + allOf(EW,E) + !()',
				status: 'Live',
				topicsOneOf: [],
				topicsAllOf: ['EW', 'E'],
				topicsNoneOf: [],
				paragraphComponents: [
					{
						__typename: 'StaticText',
						_id: '603d2117d116fb35f64fe205',
						id: 'A6pqbo7kmWdAD8Cz0cVPN-STXT-0',
						type: 'StaticText',
						textFirstPerson:
							"The disciplinary process against me is unjustified and unfair, and any resulting disciplinary action would clearly be unfair. In particular: [add up to three bullet points with the strongest reasons that it is unfair. Examples: lack of evidence; that even if proven, the action wasn't misconduct; bias. Try to explain your reasons.]",
						textThirdPerson:
							"The disciplinary process against our client is unjustified and unfair, and any resulting disciplinary action would clearly be unfair. In particular: [add up to three bullet points with the strongest reasons that it is unfair. Examples: lack of evidence; that even if proven, the action wasn't misconduct; bias. Try to explain your reasons.]",
						meta: { __typename: 'Meta', created: null, updated: 1615042011871 },
					},
				],
				paragraphComponentRefs: ['A6pqbo7kmWdAD8Cz0cVPN-STXT-0'],
				meta: { __typename: 'Meta', created: null, updated: 1615042011875 },
			},
		},
		documentComponent: null,
		isSelected: false,
	},
] as unknown) as SessionParagraph[];

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

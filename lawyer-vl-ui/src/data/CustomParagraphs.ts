import { CaseTopic, Paragraph, Topic } from './types'

export class CustomParagraphs {
	static top = [
		{
			id: 'A00001',
			paragraph: 'PRIVATE & CONFIDENTIAL',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
			bold: true,
		},
		{
			id: 'A00002',
			paragraph: '[Full name of recipient]',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00003',
			paragraph: '[Company name]',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00004',
			paragraph: 'By email only to: [email]',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00005',
			paragraph: '[Today]',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00006',
			paragraph: 'Dear Sir or Madam',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00007',
			paragraph:
				'Settlement - Without Prejudice Save as to Costs & Subject to Contract',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
			bold: true,
		},
	]

	static bottom = [
		{
			id: 'A0009',
			paragraph:
				'However, I would prefer to remain on amicable terms and avoid the stress and time of litigation. For that reason, I’m suggesting we agree on the following terms: [edit as appropriate]',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00010',
			paragraph: '-- Termination date of xx',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00011',
			paragraph: '-- Orderly handover',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00012',
			paragraph: '-- [x] months’ notice pay',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00013',
			paragraph: '-- Outstanding pay in the sum of [x]',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00014',
			paragraph: '-- No disparaging remarks from either party',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00015',
			paragraph: '-- Mutual confidentiality of terms',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00016',
			paragraph: '-- Agreed reference',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00017',
			paragraph: "-- Ex gratia payment of [x] months' gross salary",
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00018',
			paragraph:
				'-- Legal fees of £500 (plus VAT) for advice on the terms and effect of a settlement agreement.',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00019',
			paragraph:
				'If these terms are agreed, I will agree to waive any employment tribunal claims.',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00020',
			paragraph: 'I look forward to hearing from you.',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00021',
			paragraph: 'Yours faithfully',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00022',
			paragraph: '[name]',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
			bold: true,
		},
	]

	static getParagraphs(
		selectedTopics: CaseTopic[]
	): { top: Paragraph[]; bottom: Paragraph[] } {
		const isEmployed = selectedTopics?.some(({ id }) => id === 'E')

		if (isEmployed) {
			return { top: CustomParagraphs.top, bottom: CustomParagraphs.bottom }
		} else {
			const bottomParagraphs = CustomParagraphs.bottom.filter(
				({ id }) => !['A00010', 'A00011', 'A00012'].includes(id)
			)
			return { top: CustomParagraphs.top, bottom: bottomParagraphs }
		}
	}
}

import { CaseTopic, Paragraph, Topic } from './types'

export class CustomParagraphs {
	static top = [
		{
			id: 'A00001',
			textThirdPerson: 'PRIVATE & CONFIDENTIAL',
			html: '<b>PRIVATE & CONFIDENTIAL</b>',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
			bold: true,
		},
		{
			id: 'A00002',
			textThirdPerson: '[Full name of recipient]',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00003',
			textThirdPerson: '[Company name]',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00004',
			textThirdPerson: 'By email only to: [email]',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00005',
			textThirdPerson: '[Today]',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00006',
			textThirdPerson: 'Dear Sir or Madam',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00007',
			textThirdPerson:
				'Settlement - Without Prejudice Save as to Costs & Subject to Contract',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
			bold: true,
		},
	] as Paragraph[]

	static bottom = [
		{
			id: 'A0009',
			textThirdPerson:
				'However, I would prefer to remain on amicable terms and avoid the stress and time of litigation. For that reason, I’m suggesting we agree on the following terms: [edit as appropriate]',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00010',
			textThirdPerson: '-- Termination date of xx',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00011',
			textThirdPerson: '-- Orderly handover',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00012',
			textThirdPerson: '-- [x] months’ notice pay',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00013',
			textThirdPerson: '-- Outstanding pay in the sum of [x]',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00014',
			textThirdPerson: '-- No disparaging remarks from either party',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00015',
			textThirdPerson: '-- Mutual confidentiality of terms',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00016',
			textThirdPerson: '-- Agreed reference',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00017',
			textThirdPerson: "-- Ex gratia payment of [x] months' gross salary",
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00018',
			textThirdPerson:
				'-- Legal fees of £500 (plus VAT) for advice on the terms and effect of a settlement agreement.',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00019',
			textThirdPerson:
				'If these terms are agreed, I will agree to waive any employment tribunal claims.',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00020',
			textThirdPerson: 'I look forward to hearing from you.',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00021',
			textThirdPerson: 'Yours faithfully',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
		},
		{
			id: 'A00022',
			textThirdPerson: '[name]',
			verticalHeight: 0,
			topicsOneOf: [],
			topicsAllOf: ['All'],
			topicsNoneOf: [],
			bold: true,
		},
	] as Paragraph[]

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

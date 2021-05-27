import { getFirstQuestion, getNextQuestion } from './questionFlow';
import { Question } from '../types/Questions';

const allQuestions: Question[] = [
	{
		id: 1,
		prerequisites: [],
		text: 'Are you still employed?',
		subtext: 'Choose one:',
		minAnswers: 1,
		maxAnswers: 1,
		options: [
			{
				text: 'Still employed',
				topicId: 'E',
			},
			{
				text: 'No longer employed',
				topicId: '_NE',
			},
		],
	},
	{
		id: 2,
		prerequisites: ['_NE'],
		text: 'Are you still in your job',
		subtext: 'How did your employment end',
		minAnswers: 1,
		maxAnswers: 1,
		options: [
			{
				text: 'I resigned',
				topicId: 'Rd',
			},
			{
				text: 'I was dismissed',
				topicId: 'T',
			},
		],
	},
	{
		id: 3,
		prerequisites: [],
		text: 'How long have you been in your job',
		subtext: '',
		minAnswers: 1,
		maxAnswers: 1,

		options: [
			{
				text: 'More than two years',
				topicId: 'M2y',
			},
			{
				text: 'Less than two years',
				topicId: '2y',
			},
		],
	},
	{
		id: 4,
		prerequisites: ['T'],
		text: 'Why were you dismissed',
		subtext: 'What was the reason given for your dismissal?',
		minAnswers: 0,
		maxAnswers: 100,
		options: [
			{
				text: 'Redundancy',
				topicId: 'R',
			},
			{
				text: 'Misconduct',
				topicId: 'Mt',
			},
			{
				text: 'Poor performance',
				topicId: 'P',
			},
			{
				text: 'Sickness absence',
				topicId: 'S',
			},
			{
				text: 'No reason',
				topicId: 'NRD',
			},
			{
				text: 'Other',
				topicId: 'ORD',
			},
		],
	},
	{
		id: 5,
		prerequisites: ['R'],
		text: 'Why were you dismissed',
		subtext: 'Was there a problem with the redundancy?',
		minAnswers: 0,
		maxAnswers: 100,

		options: [
			{
				text: 'No reduction of work',
				topicId: '_RNRW',
			},
			{
				text: 'Suitable alternative employment was not considered',
				topicId: '_RNA',
			},
			{
				text: 'Scoring issues',
				topicId: '_RSI',
			},
			{
				text: 'Selection outcome predetermined',
				topicId: '_RSP',
			},
			{
				text: 'Problematic selection criteria',
				topicId: '_RPC',
			},
			{
				text: "They didn't consult adequately",
				topicId: '_RNC',
			},
		],
	},
	{
		id: 6,
		prerequisites: [],
		text: 'Employment issues',
		subtext: 'If any of these apply, choose one or more',
		minAnswers: 0,
		maxAnswers: 100,
		options: [
			{
				text: 'Bullying/harassment',
				topicId: 'B',
			},
			{
				text: 'Redundancy',
				topicId: 'RR',
				prerequisites: ['!T'],
			},
			{
				text: 'Suspension',
				topicId: 'Sn',
				prerequisites: ['!T'],
			},
			{
				text: 'Disciplinary',
				topicId: 'Dy',
				prerequisites: ['!T'],
			},
			{
				text: 'Unsafe workplace',
				topicId: 'H',
			},
			{
				text: 'Performance',
				topicId: 'P',
			},
			{
				text: 'Sickness',
				topicId: 'S',
				prerequisites: ['!T'],
			},
			{
				text: 'Toxic work environment',
				topicId: 'TWE',
			},
			{
				text: 'Excessive workload',
				topicId: 'EW',
			},
			{
				text: 'Money owed',
				topicId: 'M',
			},
			{
				text: 'No contract',
				topicId: 'F',
			},
			{
				text: 'Other',
				topicId: 'OBT',
			},
		],
	},
	{
		id: 7,
		prerequisites: [],
		text: 'Why did this happen?',
		subtext: 'Why do you think your employer acted this way? Select all that apply',
		minAnswers: 0,
		maxAnswers: 100,
		options: [
			{
				text: 'I am a whistleblower',
				topicId: 'W',
			},
			{
				text: 'I refused to attend work for health & safety reasons',
				topicId: 'HD',
			},
			{
				text: 'Discrimination',
				topicId: '_PC',
			},
			{
				text: 'Race or ethnicity',
				topicId: 'DR',
				prerequisites: ['_PC'],
			},
			{
				text: 'Sex/gender',
				topicId: 'DS',
				prerequisites: ['_PC'],
			},
			{
				text: 'Physical or Mental health condition',
				topicId: 'DD',
				prerequisites: ['_PC'],
			},
			{
				text: 'Pregnancy',
				topicId: 'DP',
				prerequisites: ['_PC'],
			},
			{
				text: 'Maternity',
				topicId: 'DM',
				prerequisites: ['_PC'],
			},
			{
				text: 'Age',
				topicId: 'DA',
				prerequisites: ['_PC'],
			},
			{
				text: 'Religious belief',
				topicId: 'DRn',
				prerequisites: ['_PC'],
			},
			{
				text: 'Philosophical belief',
				topicId: 'DPl',
				prerequisites: ['_PC'],
			},
			{
				text: 'Sexual orientation',
				topicId: 'DSy',
				prerequisites: ['_PC'],
			},
			{
				text: 'Gender reassignment',
				topicId: 'DG',
				prerequisites: ['_PC'],
			},
			{
				text: 'Marital or civil partnership status',
				topicId: 'DMe',
				prerequisites: ['_PC'],
			},
			{
				text: 'Other',
				topicId: 'ORT',
			},
		],
	},
	{
		id: 8,
		prerequisites: ['_PC'],
		text: 'Did you ever complain to your employer about this discrimination?',
		subtext: 'Why do you think your employer acted this way? Select all that apply',
		minAnswers: 1,
		maxAnswers: 1,
		options: [
			{
				text: 'No',
				topicId: '_NCE',
			},
			{
				text: 'Yes, but I was not treated badly afterwards',
				topicId: '_YCE',
			},
			{
				text: 'Yes, and I was treated badly afterwards',
				topicId: 'V',
			},
		],
	},
];

describe('Question flow', () => {
	test('First question returned', () => {
		expect(getFirstQuestion()).toHaveProperty('text', 'Are you still employed?');
	});

	test('Question prerequisite not met', () => {
		const selectedTopics = [];
		const answeredQuestions = [];
		const nextQuestion = getNextQuestion(selectedTopics, answeredQuestions, 1);
		expect(nextQuestion.id).toBe(3);
	});

	test('Question prerequisite met', () => {
		const selectedTopics = [{ id: '_NE' }];
		const answeredQuestions = [];
		const nextQuestion = getNextQuestion(selectedTopics, answeredQuestions, 1);
		expect(nextQuestion.id).toBe(2);
	});

	test('Given 4 answered questions When Question 3 is answered again Then Next question is 6', () => {
		const selectedTopics = [{ id: 'E' }, { id: 'M2y' }, { id: '_NCE' }];
		const answeredQuestions = [1, 3, 6, 7];
		const nextQuestion = getNextQuestion(selectedTopics, answeredQuestions, 3);
		expect(nextQuestion.id).toBe(6);
	});
});

import { getFirstQuestion, getNextQuestion } from './questionFlow'
import { Question } from '../types/Questions'

describe('Question flow', () => {
	test('First question returned', () => {
		expect(getFirstQuestion()).toHaveProperty('text', 'How can we help you')
	})

	test('Question prerequisite not met', () => {
		const selectedTopics = []
		const answeredQuestions = allQuestions.slice(0, 1)
		const nextQuestion = getNextQuestion(selectedTopics, answeredQuestions)
		expect(nextQuestion.id).toBe(3)
	})

	test('Question prerequisite met', () => {
		const selectedTopics = [{ id: '_RES' }]
		const answeredQuestions = allQuestions.slice(0, 1)
		const nextQuestion = getNextQuestion(selectedTopics, answeredQuestions)
		expect(nextQuestion.id).toBe(2)
	})
})

const allQuestions: Question[] = [
	{
		id: 1,
		prerequisites: [],
		text: 'How can we help you',
		subtext: 'Do any of the following apply to you',
		minAnswers: 1,
		maxAnswers: 1,
		isFinal: false,
		options: [
			{
				text: 'I want to write to my employer',
				topicId: '_LET',
			},
			{
				text: 'My employer has responded to my initial letter',
				topicId: '_RES',
			},
			{
				text: 'I just want some advice',
				topicId: '_ADV',
			},
		],
	},
	{
		id: 2,
		prerequisites: ['_RES'],
		text: 'Are you still in your job',
		subtext: 'What type of response did you receive?',
		minAnswers: 1,
		maxAnswers: 1,
		isFinal: true,
		options: [
			{
				text: 'Complete denial',
				topicId: '_RES_CD',
			},
			{
				text: 'Counter offer',
				topicId: '_RES_CO',
			},
			{
				text: 'Investigating',
				topicId: '_RES_I',
			},
			{
				text: 'Want to keep me',
				topicId: '_RES_KM',
			},
		],
	},
	{
		id: 3,
		prerequisites: [],
		text: 'Are you still in your job',
		subtext: 'Which best describes your current situation',
		minAnswers: 1,
		maxAnswers: 1,
		isFinal: false,
		options: [
			{
				text: 'I am still working in my job',
				topicId: 'E',
			},
			{
				text: 'I have left my job',
				topicId: '_NE',
			},
		],
	},
	{
		id: 4,
		prerequisites: ['_NE'],
		text: 'Are you still in your job',
		subtext: 'How did your employment end',
		minAnswers: 1,
		maxAnswers: 1,
		isFinal: false,
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
		id: 5,
		prerequisites: [],
		text: 'Are you still in your job',
		subtext: 'How long were you (have you been) in your job?',
		minAnswers: 1,
		maxAnswers: 1,
		isFinal: false,
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
		id: 6,
		prerequisites: ['E'],
		text: 'What would you like to do?',
		subtext: "What's your preferred course of action?",
		minAnswers: 1,
		maxAnswers: 1,
		isFinal: false,
		options: [
			{
				text: 'Stay employed and submit a grievance',
				topicId: '_GR',
			},
			{
				text: 'Leave my job and seek an exit package',
				topicId: '_EX',
			},
		],
	},
	{
		id: 7,
		prerequisites: ['T'],
		text: 'Why were you dismissed',
		subtext: 'What was the reason given for your dismissal?',
		minAnswers: 0,
		maxAnswers: 100,
		isFinal: false,
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
		id: 8,
		prerequisites: ['R'],
		text: 'Why were you dismissed',
		subtext: 'Was there a problem with the redundancy?',
		minAnswers: 0,
		maxAnswers: 100,
		isFinal: false,
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
		id: 9,
		prerequisites: [],
		text: 'Problems at work',
		subtext: 'What problem(s) have you faced at work? Select any or all that apply?',
		minAnswers: 0,
		maxAnswers: 100,
		isFinal: false,
		options: [
			{
				text: 'Bullying/harassment',
				topicId: 'B',
			},
			{
				text: 'Risk of redundancy',
				topicId: 'RR',
				prerequisites: ['!T'],
			},
			{
				text: 'Wrongful suspension',
				topicId: 'Sn',
				prerequisites: ['!T'],
			},
			{
				text: 'Disciplinary proceedings',
				topicId: 'Dy',
				prerequisites: ['!T'],
			},
			{
				text: 'Unsafe workplace e.g. Coronavirus',
				topicId: 'H',
			},
			{
				text: 'Performance issues',
				topicId: 'P',
			},
			{
				text: 'Sickness issues',
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
				text: 'Employer owes money',
				topicId: 'M',
			},
			{
				text: 'No written employment terms',
				topicId: 'F',
			},
			{
				text: 'Other',
				topicId: 'OBT',
			},
		],
	},
	{
		id: 10,
		prerequisites: [],
		text: 'Why did this happen?',
		subtext: 'Why do you think your employer acted this way? Select all that apply',
		minAnswers: 0,
		maxAnswers: 100,
		isFinal: false,
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
				text: 'Physical condition',
				topicId: 'DD',
				prerequisites: ['_PC'],
			},
			{
				text: 'Mental health',
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
		id: 11,
		prerequisites: ['_PC'],
		text: 'Did you ever complain to your employer about this discrimination?',
		subtext: 'Why do you think your employer acted this way? Select all that apply',
		minAnswers: 1,
		maxAnswers: 1,
		isFinal: false,
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
]

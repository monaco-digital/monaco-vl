import { useDispatch, useSelector } from 'react-redux'
import AppState from '../data/AppState'
import { CaseTopic, Question } from '../data/types'

export const getFirstQuestion = () => {
	return allQuestions[0]
}

export const getNextQuestion = (selectedTopics, answeredQuestions) => {
	console.log(
		'getNextQuestion',
		selectedTopics.length,
		answeredQuestions.length
	)

	// const selectedTopics = useSelector<AppState, CaseTopic[]>(
	//     state => state.topics.selected
	// )
	const selectedTopicIds: string[] = selectedTopics.map(t => t.id)

	// const answeredQuestions = useSelector<AppState, Question[]>(
	// 	state => state.questions.answeredQuestions
	// )
	const answeredQuestionsIds = answeredQuestions.map(q => q.id)

	let index = 0
	let nextQuestion = null
	while (!nextQuestion && index < allQuestions.length) {
		const prerequisites = allQuestions[index].prerequisites || []
		const prerequisitesMet = prerequisites.every(id =>
			selectedTopicIds.includes(id)
		)
		const answeredAlready = answeredQuestionsIds.includes(
			allQuestions[index].id
		)

		if (prerequisitesMet && !answeredAlready) {
			nextQuestion = allQuestions[index]
		}
		index++
	}

	return nextQuestion
}

/*
,
			{
				text: 'I am working my notice period',
				topicId: 'E',
			},
*/

const allQuestions: Question[] = [
	{
		id: 1,
		prerequisites: [],
		text: 'Are you still in your job',
		subtext: 'Which best describes your current situation',
		minAnswers: 1,
		maxAnswers: 1,
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
		prerequisites: ['_NE'],
		text: 'Are you still in your job',
		subtext: 'How long were you (have you been) in your job?',
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
		text: 'Problems at work',
		subtext:
			'What problem(s) have you faced at work? Select any or all that apply?',
		minAnswers: 0,
		maxAnswers: 100,
		options: [
			{
				text: 'Bullying/harassment',
				topicId: 'B',
			},
			{
				text: 'Risk of redundancy',
				topicId: '_Rr',
			},
			{
				text: 'Unjustified performance management',
				topicId: '_UP',
			},
			{
				text: 'Unjustified disciplinary proceedings',
				topicId: '_UDy',
			},
			{
				text: 'Poor response to sickness issues',
				topicId: '_US',
			},
			{
				text: 'Unsafe workplace e.g. Coronavirus',
				topicId: 'H',
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
				text: 'Wrongful suspension',
				topicId: 'Sn',
			},
			{
				text: 'Employer owes money',
				topicId: 'M',
			},
			{
				text: 'No written employment terms',
				topicId: 'FPP',
			},
			{
				text: 'Other',
				topicId: 'TB',
			},
		],
	},
	{
		id: 7,
		prerequisites: [],
		text: 'Why did this happen?',
		subtext:
			'Why do you think your employer acted this way? Select all that apply',
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
				text: 'Because of my:',
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
				topicId: 'DMl',
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
				prerequisites: ['_PC'],
			},
		],
	},
	{
		id: 8,
		prerequisites: [],
		text: 'Did you ever complain to your employer about this?',
		subtext:
			'Why do you think your employer acted this way? Select all that apply',
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
]

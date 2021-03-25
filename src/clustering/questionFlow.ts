import { Question } from '../types/Questions';

const allQuestions: Question[] = [
	{
		id: 1,
		prerequisites: [],
		text: 'How can we help today?',
		subtext: 'Choose one:',
		minAnswers: 1,
		maxAnswers: 1,
		isFinal: false,
		options: [
			{
				text: 'Get advice',
				topicId: '_ADV',
			},
			{
				text: 'Write a letter to your employer',
				topicId: '_LET',
			},
			{
				text: 'Respond to your employer',
				topicId: '_RES',
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
		text: 'Are you still employed?',
		subtext: 'Choose one:',
		minAnswers: 1,
		maxAnswers: 1,
		isFinal: false,
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
		text: 'How long have you been in your job?',
		subtext: '',
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
		text: 'What do you want?',
		subtext: '(What is your ideal outcome?)',
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
		text: 'Employment issues',
		subtext: 'If any of these apply, choose one or more',
		minAnswers: 0,
		maxAnswers: 100,
		isFinal: false,
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
		id: 10,
		prerequisites: [],
		text: 'Other issues',
		subtext: 'If any of these apply, choose one or more',
		minAnswers: 0,
		maxAnswers: 100,
		isFinal: false,
		options: [
			{
				text: 'Whistleblowing',
				topicId: 'W',
			},
			{
				text: 'Race or ethnicity',
				topicId: 'DR',
			},
			{
				text: 'Sex/gender',
				topicId: 'DS',
			},
			{
				text: 'Pregnancy',
				topicId: 'DP',
			},
			{
				text: 'Maternity',
				topicId: 'DM',
			},
			{
				text: 'Physical or Mental health condition',
				topicId: 'DD',
			},
			{
				text: 'Age',
				topicId: 'DA',
			},
			{
				text: 'Religious belief',
				topicId: 'DRn',
			},
			{
				text: 'Philosophical belief',
				topicId: 'DPl',
			},
			{
				text: 'Sexual orientation',
				topicId: 'DSy',
			},
			{
				text: 'Gender reassignment',
				topicId: 'DG',
			},
			{
				text: 'Marital or civil partnership status',
				topicId: 'DMe',
			},
			{
				text: 'Other',
				topicId: 'ORT',
			},
		],
	},
	{
		id: 11,
		prerequisites: [],
		text: 'Did you ever complain to your employer about discrimination, either against yourself or anybody else?',
		subtext: '',
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
];

export const getFirstQuestion = (): Question => allQuestions[0];

export const getNextQuestion = (selectedTopics = [], answeredQuestions: Question[]): Question => {
	const selectedTopicIds: string[] = selectedTopics.map(t => t.id);
	const answeredQuestionsIds = answeredQuestions.map(q => q.id);
	const lastAnsweredQuestion = answeredQuestions.length > 1 ? answeredQuestions[answeredQuestions.length - 1] : null;

	if (lastAnsweredQuestion?.isFinal) return null;

	let index = 0;
	let nextQuestion = null;
	while (!nextQuestion && index < allQuestions.length) {
		const prerequisites = allQuestions[index].prerequisites || [];
		const prerequisitesMet = prerequisites.every(id => selectedTopicIds.includes(id));
		const answeredAlready = answeredQuestionsIds.includes(allQuestions[index].id);

		if (prerequisitesMet && !answeredAlready) {
			nextQuestion = allQuestions[index];
		}
		index += 1;
	}

	return nextQuestion;
};

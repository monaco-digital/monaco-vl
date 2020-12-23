export interface Paragraph {
	id: string
	textFirstPerson: string
	textThirdPerson: string
	summary?: string
	verticalHeight: number
	topic?: string
	topicsOneOf: Topic[]
	topicsAllOf: Topic[]
	topicsNoneOf: Topic[]
	bold?: boolean
}

export const ParagraphTopics = {
	EMPLOYED: 'EMPLOYED',
	EQUAL_PAY: 'EQUAL_PAY',
	DISMISSED: 'DISMISSED',
	REDUNDANCY: 'REDUNDANCY',
	DISCRIMINATION: 'DISCRIMINATION',
	BULLYING: 'BULLYING',
	PERFORMANCE: 'PERFORMANCE',
	CORONAVIRUS: 'CORONAVIRUS',
	HEALTH_SAFETY: 'HEALTH_SAFETY',
	WHISTLEBLOWING: 'WHISTLEBLOWING',
	SICKNESS: 'SICKNESS',
	MENTAL_HEALTH: 'MENTAL_HEALTH',
	MONEY_OWED: 'MONEY_OWED',
	STAY_EMPLOYED: 'STAY_EMPLOYED',
	RESIGNED: 'RESIGNED',
	SUSPENSION: 'SUSPENSION',
	MISCONDUCT: 'MISCONDUCT',
	FAILURE_TO_PROVIDE_PARTICULARS: 'FAILURE_TO_PROVIDE_PARTICULARS',
	GRIEVANCE: 'GRIEVANCE',
	PREGNANCY: 'PREGNANCY',
	MATERNITY: 'MATERNITY',
	SEX: 'SEX',
	SEXUALITY: 'SEXUALITY',
	RACE: 'RACE',
	RELIGION_BELIEF: 'RELIGION_BELIEF',
	AGE: 'AGE',
	DISABILITY: 'DISABILITY',
	MARRIAGE_CIVIL_PARTNERSHIP: 'MARRIAGE_CIVIL_PARTNERSHIP',
	GENDER_REASSIGNMENT: 'GENDER_REASSIGNMENT',
	POLITICAL_PHILOSOPHICAL: 'POLITICAL_PHILOSOPHICAL',
	MENTAL_HEALTH_DISCRIMINATION: 'MENTAL_HEALTH_DISCRIMINATION',
	VEGAN: 'VEGAN',
	ALL: 'ALL',
	LESS_THAN_2_YEARS: 'LESS_THAN_2_YEARS',
}

export type Topic =
	| 'E'
	| 'EP'
	| 'T'
	| 'R'
	| 'D'
	| 'B'
	| 'P'
	| 'C'
	| 'H'
	| 'W'
	| 'NE'
	| 'S'
	| 'S1'
	| 'Ml'
	| 'M'
	| 'Rd'
	| 'Sn'
	| 'Mt'
	| 'F'
	| 'G'
	| 'DP'
	| 'DM'
	| 'DS'
	| 'DSy'
	| 'DR'
	| 'DRn'
	| 'DA'
	| 'DD'
	| 'DMe'
	| 'DG'
	| 'DPI'
	| 'DPl'
	| 'DMl'
	| 'DV'
	| '2y'
	| 'All'
	| 'M2y'
	| '_NE'
	| '_M'
	| 'NRD'
	| 'ORD'
	| 'Dy'
	| 'TWE'
	| 'EW'
	| 'TB'
	| 'HD'
	| 'ORT'
	| 'V'
	| '_RNRW'
	| '_RNA'
	| '_RSI'
	| '_RSP'
	| '_RPC'
	| '_RNC'
	| '_NCE'
	| '_YCE'
	| '_PC'
	| '_Rr'
	| '_UP'
	| '_UDy'
	| '_US'

export interface CaseTopic {
	id?: Topic
	name: string
	text: string
	questionText?: string
	parentTopics?: string[]
	subtopics?: string[]
	type: string
}

export const Topics: CaseTopic[] = [
	{
		id: 'E',
		name: 'EMPLOYED',
		text: 'Employed',
		questionText: 'I am still employed',
		parentTopics: [],
		subtopics: [],
		type: 'employment_situation',
	},
	{
		id: 'NE',
		name: 'NOT_EMPLOYED',
		text: 'Not Employed',
		questionText: 'I am no longer employed',
		parentTopics: [],
		subtopics: [],
		type: 'employment_situation',
	},
	{
		id: 'EP',
		name: 'EQUAL_PAY',
		text: 'Equal pay',
		questionText: 'Equal pay',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: 'T',
		name: 'DISMISSED',
		text: 'Dismissed',
		questionText: 'I have been dismissed',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: 'R',
		name: 'REDUNDANCY',
		text: 'Redundancy',
		questionText: 'I was made redudannt',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: 'D',
		name: 'DISCRIMINATION',
		text: 'Discrimination',
		questionText: 'Discrimination',
		parentTopics: [],
		subtopics: [
			'DP',
			'DM',
			'DS',
			'DSy',
			'DR',
			'DRn',
			'DA',
			'DD',
			'DMe',
			'DG',
			'DPI',
			'DMl',
			'DV',
		],
		type: 'case',
	},
	{
		id: 'B',
		name: 'BULLYING',
		text: 'Bullying',
		questionText: 'Bullying',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: 'P',
		name: 'PERFORMANCE',
		text: 'Performance',
		questionText: 'I failed a performance review',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: 'C',
		name: 'CORONAVIRUS',
		text: 'Coronavirus',
		questionText: 'Coronavirus',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: 'H',
		name: 'HEALTH_SAFETY',
		text: 'Health & Safety',
		questionText: 'Health & Safety',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: 'W',
		name: 'WHISTLEBLOWING',
		text: 'Whistleblowing',
		questionText: 'Whistleblowing',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: 'S',
		name: 'SICKNESS',
		text: 'Sickness',
		questionText: 'Sickness',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: 'S1',
		name: 'STAY_EMPLOYED',
		text: 'Stay employed',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: 'Ml',
		name: 'MENTAL_HEALTH',
		text: 'Mental health',
		questionText: 'Mental health',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: 'M',
		name: 'MONEY_OWED',
		text: 'Money owed',
		questionText: 'Money owed',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: 'Rd',
		name: 'RESIGNED',
		text: 'Resigned',
		questionText: 'I have resigned',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: 'Sn',
		name: 'SUSPENSION',
		text: 'Suspension',
		questionText: 'I was suspended',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: 'Mt',
		name: 'MISCONDUCT',
		text: 'Misconduct',
		questionText: 'Misconduct',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: 'F',
		name: 'FAILURE_TO_PROVIDE_PARTICULARS',
		text: 'Failure to provide particulars',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: 'G',
		name: 'GRIEVANCE',
		text: 'Grievance',
		questionText: 'Grievance',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: 'DP',
		name: 'PREGNANCY',
		text: 'Pregnancy',
		questionText: 'Pregnancy',
		parentTopics: [],
		subtopics: [],
		type: 'subcase',
	},
	{
		id: 'DM',
		name: 'MATERNITY',
		text: 'Maternity',
		questionText: 'Maternity',
		parentTopics: [],
		subtopics: [],
		type: 'subcase',
	},
	{
		id: 'DS',
		name: 'SEX',
		text: 'Sex',
		questionText: 'Sex',
		parentTopics: [],
		subtopics: [],
		type: 'subcase',
	},
	{
		id: 'DSy',
		name: 'SEXUALITY',
		text: 'Sexuality',
		questionText: 'Sexuality',
		parentTopics: [],
		subtopics: [],
		type: 'subcase',
	},
	{
		id: 'DR',
		name: 'RACE',
		text: 'Race',
		questionText: 'Race',
		parentTopics: [],
		subtopics: [],
		type: 'subcase',
	},
	{
		id: 'DRn',
		name: 'RELIGION_BELIEF',
		text: 'Religion / belief',
		questionText: 'Religion / belief',
		parentTopics: [],
		subtopics: [],
		type: 'subcase',
	},
	{
		id: 'DA',
		name: 'AGE',
		text: 'Age',
		questionText: 'Age',
		parentTopics: [],
		subtopics: [],
		type: 'subcase',
	},
	{
		id: 'DD',
		name: 'DISABILITY',
		text: 'Disability',
		questionText: 'Disability',
		parentTopics: [],
		subtopics: [],
		type: 'subcase',
	},
	{
		id: 'DMe',
		name: 'MARRIAGE_CIVIL_PARTNERSHIP',
		text: 'Marriage / Civil partnership',
		questionText: 'Marriage / Civil partnership',
		parentTopics: [],
		subtopics: [],
		type: 'subcase',
	},
	{
		id: 'DG',
		name: 'GENDER_REASSIGNMENT',
		text: 'Gender reassignment',
		questionText: 'Gender reassignment',
		parentTopics: [],
		subtopics: [],
		type: 'subcase',
	},
	{
		id: 'DPl',
		name: 'POLITICAL_PHILOSOPHICAL',
		text: 'Political / philosophical',
		questionText: 'Political / philosophical',
		parentTopics: [],
		subtopics: [],
		type: 'subcase',
	},
	{
		id: 'DMl',
		name: 'MENTAL_HEALTH_DISCRIMINATION',
		text: 'Mental health discrimination',
		questionText: 'Mental health',
		parentTopics: [],
		subtopics: [],
		type: 'subcase',
	},
	{
		id: 'DV',
		name: 'VEGAN',
		text: 'Vegan',
		parentTopics: [],
		subtopics: [],
		type: 'subcase',
	},
	{
		id: 'All',
		name: 'ALL',
		text: 'All',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: '2y',
		name: 'LESS_THAN_2_YEARS',
		text: 'Less than 2 years',
		parentTopics: [],
		subtopics: [],
		type: 'employment_situation',
	},
	{
		id: 'M2y',
		name: 'MORE_THAN_2_YEARS',
		text: 'More than 2 years',
		parentTopics: [],
		subtopics: [],
		type: 'employment_situation',
	},
	{
		id: '_NE',
		name: 'NOT_EMPLOYED',
		text: 'Not employed',
		type: 'employment_situation',
	},
	{
		id: '_M',
		name: 'MISCORNDUCT',
		text: 'Misconduct',
		type: 'employment_situation',
	},
	{
		id: 'NRD',
		name: 'DISMISSAL_NO_REASON',
		text: 'No reason for dismissal',
		type: 'employment_situation',
	},
	{
		id: 'ORD',
		name: 'DISMISSAL_OTHER',
		text: 'Other reason for dismissal',
		type: 'employment_situation',
	},
	{
		id: 'Dy',
		name: 'DISCIPLINARY_UNJUSTIFIED',
		text: 'Unjustified reason for disciplinary',
		type: 'employment_situation',
	},
	{
		id: 'TWE',
		name: 'TOXIC_WORK_ENVIRONMENT',
		text: 'Toxic work environment',
		type: 'employment_situation',
	},
	{
		id: 'EW',
		name: 'EXCESSIVE_WORKLOAD',
		text: 'Excessive workload',
		type: 'employment_situation',
	},
	{
		id: 'TB',
		name: 'OTHER_PROBLEMS',
		text: 'Other problems',
		type: 'employment_situation',
	},
	{
		id: 'HD',
		name: 'REFUSED_ATTEND_HS',
		text: 'Refused to attend (H&S)',
		type: 'employment_situation',
	},
	{
		id: 'ORT',
		name: 'OTHER_REASON_DISMISSAL',
		text: 'Other reason for dismissal',
		type: 'employment_situation',
	},
	{
		id: 'V',
		name: 'VICTIMISATION',
		text: 'Victimisation',
		type: 'employment_situation',
	},
	{
		id: '_RNRW',
		name: 'NO_REDUCTION_WORK',
		text: 'No reduction of work',
		type: 'employment_situation',
	},
	{
		id: '_RNA',
		name: 'NO_ALTERNATIVE_CONSIDERED',
		text: 'Alternative employment not considered',
		type: 'employment_situation',
	},
	{
		id: '_RSI',
		name: 'SCORING_ISSUES',
		text: 'Scoring issues',
		type: 'employment_situation',
	},
	{
		id: '_RSP',
		name: 'OUTCOME_PREDEFINED',
		text: 'Selection outcome predetermined',
		type: 'employment_situation',
	},
	{
		id: '_RPC',
		name: 'PROBLEMATIC_SELECTION',
		text: 'Problematic selection criteria',
		type: 'employment_situation',
	},
	{
		id: '_RNC',
		name: 'INADEQUATE_CONSULATION',
		text: 'Inadequate consultation',
		type: 'employment_situation',
	},
	{
		id: '_NCE',
		name: 'HAVENT_COMPLAINED',
		text: "Haven't complained",
		type: 'employment_situation',
	},
	{
		id: '_YCE',
		name: 'COMPLAINED_TO_EMPLOYER',
		text: 'Complained to employer',
		type: 'employment_situation',
	},
	{
		id: '_PC',
		name: 'PROTECTED_CHARACTERISTIC',
		text: 'Protected characteristic',
		type: 'employment_situation',
	},
	{
		id: '_Rr',
		name: 'RISK_OF_REDUNDANCY',
		text: 'Risk of redundnacy',
		type: 'employment_situation',
	},
	{
		id: '_UP',
		name: 'UNJUSTIFIED_PERF_MGMT',
		text: 'Unjustified performance management',
		type: 'employment_situation',
	},
	{
		id: '_UDy',
		name: 'UNJUSTIFIED_DISCIPLINARY',
		text: 'Unjustified disciplinary proceedings',
		type: 'employment_situation',
	},
	{
		id: '_US',
		name: 'MISHANDLED_SICKNESS',
		text: 'Poor response to sickness issues',
		type: 'employment_situation',
	},
]

export const ParagraphTopicMapping = {
	EMPLOYED: 'E',
	EQUAL_PAY: 'EP',
	DISMISSED: 'T',
	REDUNDANCY: 'R',
	DISCRIMINATION: 'D',
	BULLYING: 'B',
	PERFORMANCE: 'P',
	CORONAVIRUS: 'C',
	HEALTH_SAFETY: 'H',
	WHISTLEBLOWING: 'W',
	SICKNESS: 'S',
	STAY_EMPLOYED: 'S1',
	MENTAL_HEALTH: 'Ml',
	MONEY_OWED: 'M',
	RESIGNED: 'Rd',
	SUSPENSION: 'Sn',
	MISCONDUCT: 'Mt',
	FAILURE_TO_PROVIDE_PARTICULARS: 'F',
	GRIEVANCE: 'G',
	PREGNANCY: 'DP',
	MATERNITY: 'DM',
	SEX: 'DS',
	SEXUALITY: 'DSy',
	RACE: 'DR',
	RELIGION_BELIEF: 'DRn',
	AGE: 'DA',
	DISABILITY: 'DD',
	MARRIAGE_CIVIL_PARTNERSHIP: 'DMe',
	GENDER_REASSIGNMENT: 'DG',
	POLITICAL_PHILOSOPHICAL: 'DPI',
	MENTAL_HEALTH_DISCRIMINATION: 'DMl',
	VEGAN: 'DV',
	ALL: 'All',
	LESS_THAN_2_YEARS: '2y',
}
export const TopicAlgebraOperators = {
	AND: '+',
	OR: ',',
	OPEN_ENCLOSURE: '(',
	CLOSE_ENCLOSURE: ')',
	NOT: '!',
}

export const DSubTopics = [
	ParagraphTopicMapping.PREGNANCY,
	ParagraphTopicMapping.MATERNITY,
	ParagraphTopicMapping.SEX,
	ParagraphTopicMapping.SEXUALITY,
	ParagraphTopicMapping.RACE,
	ParagraphTopicMapping.RELIGION_BELIEF,
	ParagraphTopicMapping.AGE,
	ParagraphTopicMapping.DISABILITY,
	ParagraphTopicMapping.MARRIAGE_CIVIL_PARTNERSHIP,
	ParagraphTopicMapping.GENDER_REASSIGNMENT,
	ParagraphTopicMapping.POLITICAL_PHILOSOPHICAL,
	ParagraphTopicMapping.MENTAL_HEALTH_DISCRIMINATION,
	ParagraphTopicMapping.VEGAN,
]

export interface Question {
	id: number
	text: string
	subtext: string
	prerequisites?: string[]
	options: Answer[]
	answers?: Answer[]
	minAnswers: number
	maxAnswers: number
}

export interface Answer {
	text: string
	topicId: string
	prerequisites?: string[]
}

export type NavView =
	| 'get-started'
	| 'key-facts'
	| 'preview-letter'
	| 'letter-builder'
	| 'help'

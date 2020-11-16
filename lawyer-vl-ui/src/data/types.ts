export interface Paragraph {
	id: string
	paragraph: string
	verticalHeight: number
	topic?: string
	topicsOneOf: string[]
	topicsAllOf: string[]
	topicsNoneOf: string[]
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
	| 'DMl'
	| 'DV'
	| '2y'

/*

topics = {
	EMPLOYED: {
		identifierf: 'E',
		text: 'Employed'
		uilabel: 'I am out of the job'
		subtopics: ['2y', 'n2y']
	}

} */

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

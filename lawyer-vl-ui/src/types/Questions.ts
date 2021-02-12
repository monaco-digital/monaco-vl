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

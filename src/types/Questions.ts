export interface Question {
	id: number
	text: string
	subtext: string
	prerequisites?: string[]
	options: Answer[]
	answers?: Answer[]
	minAnswers: number
	maxAnswers: number
	isFinal: boolean
}

export interface Answer {
	text: string
	topicId: string
	prerequisites?: string[]
}

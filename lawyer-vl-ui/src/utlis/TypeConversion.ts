import { ParagraphTopicMapping } from '../data/types'

export const replaceDInArrayOfTopics = (topics: string[]): string[] => {
	const index = topics?.indexOf(ParagraphTopicMapping.DISCRIMINATION)
	if (index > -1) {
		let utopics = topics?.splice(index, 1)
		utopics = [
			...utopics,
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
		return utopics
	} else {
		return topics
	}
}

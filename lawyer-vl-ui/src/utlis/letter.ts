import { CustomParagraphs } from '../data/CustomParagraphs'
import { CaseTopic, Paragraph, Topic } from '../data/types'

export const getLetterText = (
	selectedTopics: CaseTopic[],
	paragraphs: Paragraph[]
) => {
	const fixedParagraphs = CustomParagraphs.getParagraphs(selectedTopics)
	const { top: topParagraphs, bottom: bottomParagraphs } = fixedParagraphs
	const top = topParagraphs.map(paragraph => paragraph)
	const middle = paragraphs.map(paragraph => paragraph)
	const bottom = bottomParagraphs.map(paragraph => paragraph)

	return {
		top,
		middle,
		bottom,
	}
}

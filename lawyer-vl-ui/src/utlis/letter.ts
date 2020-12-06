import { CustomParagraphs } from '../data/CustomParagraphs'
import { CaseTopic, Paragraph, Topic } from '../data/types'

export const getLetterText = (
	selectedTopics: CaseTopic[],
	paragraphs: Paragraph[]
) => {
	const fixedParagraphs = CustomParagraphs.getParagraphs(selectedTopics)
	const { top: topParagraphs, bottom: bottomParagraphs } = fixedParagraphs
	const top = topParagraphs.map(({ paragraph }) => paragraph).join('\n\n')
	const middle = paragraphs.map(item => item.paragraph).join('\n\n')
	const bottom = bottomParagraphs.map(({ paragraph }) => paragraph).join('\n\n')
	return top.concat('\n\n').concat(middle).concat('\n\n').concat(bottom)
}

export const getLetterParagraphs = (
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

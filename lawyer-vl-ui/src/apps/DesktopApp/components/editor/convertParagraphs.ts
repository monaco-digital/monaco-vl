import { Paragraph } from '../../../../data/types'

type eParagraph = {
	type: string
	data: { text: string }
}

type eData = {
	blocks: any
}

export const convertParagraphsForEditor = (
	paragraphs: Paragraph[]
): eParagraph[] => {
	const returnData = paragraphs.map(prgph => {
		const { paragraph } = prgph
		if (prgph.bold) {
			return {
				type: 'header',
				data: {
					text: paragraph,
					level: 4,
				},
			}
		}
		return {
			type: 'paragraph',
			data: {
				text: paragraph,
			},
		}
	})
	return returnData
}

export const getEData = (paragraphs: eParagraph[]) => {
	return {
		blocks: [...paragraphs],
	}
}

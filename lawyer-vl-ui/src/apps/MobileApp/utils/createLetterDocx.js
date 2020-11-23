import { Document, Packer, Paragraph, HeadingLevel, AlignmentType } from 'docx'
import letter from '../data/letter'

const createLetterDocx = async chosenParagraphs => {
	const doc = new Document()
	const title = new Paragraph({
		text: letter.title,
		heading: HeadingLevel.TITLE,
		alignment: AlignmentType.CENTER,
		spacing: {
			after: 400,
		},
	})
	const paragraphs = chosenParagraphs.map(
		({ paragraph }) =>
			new Paragraph({
				text: paragraph,
				spacing: {
					after: 200,
				},
			})
	)

	doc.addSection({
		children: [title, ...paragraphs],
	})

	try {
		const docBlob = await Packer.toBlob(doc)

		return docBlob
	} catch (error) {
		throw Error('Error in generating doc file')
	}
}

export default createLetterDocx

import { Paragraph, StaticText } from '@monaco-digital/vl-types/lib/main'

const mapParagraphToDocument = (paragraph: Paragraph): any => {
	//extract text from paragraph ... amend with /n

	const ptext = paragraph.paragraphComponents.map(pc => {
		switch (pc.type) {
			case 'StaticText':
				const staticText = pc as StaticText
				return staticText.textFirstPerson
			default:
				return ''
		}
	})
	const text = ptext.concat('\n')
	const startIndex = 0
	const endIndex = text.length

	return {
		startIndex: startIndex,
		endIndex: endIndex,
		paragraph: {
			elements: [
				{
					startIndex: startIndex,
					endIndex: endIndex,
					textRun: {
						content: text,
						textStyle: {},
					},
				},
			],
			paragraphStyle: {
				namedStyleType: 'NORMAL_TEXT',
				direction: 'LEFT_TO_RIGHT',
			},
		},
	}
}

export const updateGoogleDocumentBody = (template: any, paragraphs: Paragraph[]): any => {
	console.log('The paragraphs being entered are: ', paragraphs)

	if (!(paragraphs?.length > 0)) {
		return template
	}

	//modifications using paragraph will happen here
	const docParaInsert = paragraphs.map(paragraph => mapParagraphToDocument(paragraph))
	let index = 0
	docParaInsert.forEach(paragraph => {
		paragraph.startIndex += index
		paragraph.elements.startIndex += index
		paragraph.endIndex += index
		paragraph.elements.endIndex += index
		index = paragraph.endIndex
	})

	const {
		body: { content },
	} = template

	//between index 16 and 17 add new paragraphs
	const top = content.slice(0, 17)
	const middle = docParaInsert
	const end = content.slice(17)

	const lastTopEndIndex = top[top.length - 1].endIndex
	const lastMiddleEndIndex = middle[middle.length - 1].endIndex

	middle.forEach(paragraph => {
		paragraph.startIndex += lastTopEndIndex
		paragraph.elements.startIndex += lastTopEndIndex
		paragraph.endIndex += lastTopEndIndex
		paragraph.elements.endIndex += lastTopEndIndex
	})

	end.forEach(paragraph => {
		paragraph.startIndex += lastMiddleEndIndex
		paragraph.elements.startIndex += lastMiddleEndIndex
		paragraph.endIndex += lastMiddleEndIndex
		paragraph.elements.endIndex += lastMiddleEndIndex
	})

	template.body.content = [...top, ...middle, ...end]
	return template
}

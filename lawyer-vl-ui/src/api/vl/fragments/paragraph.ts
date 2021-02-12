import { gql } from '@apollo/client'
import { meta } from './misc'

export const paragraphComponent = gql`
	fragment FParagraphComponent on ParagraphComponent {
		_id
		id
		type
		meta {
			...FMeta
		}
	}
`

export const staticText = gql`
	fragment FStaticText on StaticText {
		_id
		id
		type
		textFirstPerson
		textThirdPerson
		meta {
			...FMeta
		}
	}
`

export const bulletPoint = gql`
	fragment FBulletPoints on BulletPoints {
		_id
		id
		type
		meta {
			...FMeta
		}
		bulletPoints {
			placeholder
			required
			minLength
			maxLength
		}
	}
`

export const dropDown = gql`
	fragment FDropDown on DropDown {
		...FParagraphComponent
		minSelect
		maxSelect
		optionsList {
			...FOptionsList
		}
		optionsListId
	}
`

export const paragraph = gql`
	fragment FParagraph on Paragraph {
		_id
		id
		summary
		verticalHeight
		topic
		status
		topicsOneOf
		topicsAllOf
		topicsNoneOf
		paragraphComponents {
			... on StaticText {
				...FStaticText
			}
			... on BulletPoints {
				...FBulletPoints
			}
		}
		paragraphComponentRefs
		meta {
			...FMeta
		}
	}
	${staticText}
	${bulletPoint}
	${meta}
`

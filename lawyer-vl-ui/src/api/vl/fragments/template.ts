import { gql } from '@apollo/client'

const template = gql`
	fragment FTemplate on Template {
		_id
		id
		templateComponentIds
		templateComponents {
			... on TemplateImage {
				...FTemplateImage
			}
			... on TemplateSignature {
				...FTemplateSignature
			}
			... on TemplateHeader {
				...FTemplateHeader
			}
			... on TemplateSection {
				...FTemplateSection
			}
			... on TemplateParagraph {
				...FTemplateParagraph
			}
		}
		meta {
			...FMeta
		}
	}
`

const templateComponent = gql`
	fragment FTemplateComponent on TemplateComponent {
		_id
		id
		type
		alignment
		meta {
			...FMeta
		}
	}
`

const templateImage = gql`
	fragment FTemplateImage on TemplateImage {
		...FTemplateComponent
		url
	}
`
const templateSignature = gql`
	fragment FTemplateSignature on TemplateSignature {
		...FTemplateComponent
		html
	}
`

const templateHeader = gql`
	fragment FTemplateHeader on TemplateHeader {
		...FTemplateComponent
		logoId
		logo
		address
	}
`

const templateSection = gql`
	fragment FTemplateSection on TemplateSection {
		...FTemplateComponent
		sectionType
		templateCompopnenIds
		templateComponents {
			... on TemplateImage {
				...FTemplateImage
			}
			... on TemplateSignature {
				...FTemplateSignature
			}
			... on TemplateHeader {
				...FTemplateHeader
			}
			... on TemplateParagraph {
				...FTemplateParagraph
			}
		}
	}
`

const templateParagraph = gql`
	fragment FTemplateParagraph on TemplateParagraph {
		...FTemplateComponent
		paragraphId
		paragraph
	}
`

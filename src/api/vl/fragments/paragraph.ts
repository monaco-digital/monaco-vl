import { gql } from '@apollo/client';

export const paragraphComponent = gql`
	fragment FParagraphComponent on ParagraphComponent {
		id
		type
	}
`;

export const staticText = gql`
	fragment FStaticText on StaticText {
		id
		type
		textFirstPerson
	}
`;

export const editableText = gql`
	fragment FEditableText on EditableText {
		id
		type
		placeholder
		meta {
			...FMeta
		}
	}
`;

export const bulletPoint = gql`
	fragment FBulletPoints on BulletPoints {
		id
		type
		bulletPoints {
			placeholder
			required
			minLength
			maxLength
		}
	}
`;

export const paragraph = gql`
	fragment FParagraph on Paragraph {
		id
		summary
		verticalHeight
		topic
		status
		topicsOneOf
		topicsAllOf
		topicsNoneOf
		isAutomaticallyIncluded
		paragraphComponents {
			... on StaticText {
				...FStaticText
			}
			... on EditableText {
				...FEditableText
			}
			... on BulletPoints {
				...FBulletPoints
			}
		}
	}
	${staticText}
	${editableText}
	${bulletPoint}
`;

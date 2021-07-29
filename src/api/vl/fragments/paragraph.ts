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
		textThirdPerson
	}
`;

export const editableText = gql`
	fragment FEditableText on EditableText {
		id
		type
		placeholder
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
		topics {
			topicId
			value
		}
		status
		topicsOneOf
		topicsAllOf
		topicsNoneOf
		isAutomaticallyIncluded
		text
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

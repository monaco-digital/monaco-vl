export interface Document {
	id: string;
	version: number;
	baseTemplate: string;
	documentComponents: DocumentComponent[];
}

// abstract
export interface DocumentComponent {
	id: string;
	version: number;
	type: 'Image' | 'Signature' | 'Header' | 'TemplateContentSection' | 'UserContentSection' | 'Paragraph';
	baseTemplateComponent: string;
}

export interface DocumentImage extends DocumentComponent {
	type: 'Image';
	url: string;
}

export interface DocumentSignature extends DocumentComponent {
	type: 'Signature';
	html: string;
}

export interface DocumentHeader extends DocumentComponent {
	type: 'Header';
	logo: string;
	address: string;
}

export interface DocumentSection extends DocumentComponent {
	type: 'TemplateContentSection' | 'UserContentSection';
	documentComponents: DocumentComponent[];
}

export interface DocumentParagraph extends DocumentComponent {
	type: 'Paragraph';
	documentParagraphComponents: DocumentParagraphComponent[];
}

// abstract interface, never directly implemented
export interface DocumentParagraphComponent {
	id: string;
	baseTemplateComponent: string;
	type: 'StaticText' | 'BulletPoints' | 'Dropdown' | 'EditableText';
}

export interface DocumentParagraphStaticText extends DocumentParagraphComponent {
	textFirstPerson?: string;
	textThirdPerson?: string;
	type: 'StaticText';
}

export interface DocumentParagraphEditableText extends DocumentParagraphComponent {
	type: 'EditableText';
	value: string;
}

export interface DocumentParagraphBulletPoints extends DocumentParagraphComponent {
	type: 'BulletPoints';
	completedBulletPoints: {
		id: string;
		value: string;
	}[];
}

export interface DocumentParagraphDropdown {
	type: 'Dropdown';
	optionsList: string; // ID - reference
	selected: string[]; // ID - reference
}

import { Template, TemplateComponent, Document, DocumentComponent } from '@monaco-digital/vl-types/lib/main';

// made up of both
export interface SessionDocument {
	template: Template;
	document: Document;
	sessionDocumentComponents: SessionDocumentComponent[];
}

export interface SessionDocumentComponent {
	type: 'Image' | 'Paragraph' | 'Signature' | 'Header' | 'TemplateContentSection' | 'UserContentSection';
	templateComponent: TemplateComponent;
	documentComponent: DocumentComponent;
}

export interface SessionDocumentSection extends SessionDocumentComponent {
	sessionDocumentComponents: SessionDocumentComponent[];
}

/* Object to cover input and output paragraphs */
export interface SessionParagraph extends SessionDocumentComponent {
	isSelected: boolean;
}

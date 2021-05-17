import { Paragraph } from './paragraph';

export interface TemplateComponent {
	id: string;
	version: number;
	type: 'Image' | 'Paragraph' | 'Signature' | 'Header' | 'Section' | 'TemplateContentSection' | 'UserContentSection';
	alignment?: 'left' | 'right' | 'center' | 'justify';
}

export interface TemplateImage extends TemplateComponent {
	type: 'Image';
	url: string;
}

export interface TemplateSignature extends TemplateComponent {
	type: 'Signature';
	html: string;
}

export interface TemplateHeader extends TemplateComponent {
	logoId: string;
	type: 'Header';
	logo: TemplateImage;
	address: string;
}

export interface TemplateSection extends TemplateComponent {
	type: 'TemplateContentSection' | 'UserContentSection';
	templateComponentIds?: string[];
	templateComponents?: TemplateComponent[];
}

export interface TemplateParagraph extends TemplateComponent {
	paragraph?: Paragraph;
	type: 'Paragraph';
}
export interface Template {
	id: string;
	templateComponents?: TemplateComponent[];
	version: number;
}

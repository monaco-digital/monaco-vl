import { Meta } from './meta';
import { Paragraph } from './paragraph';

export interface TemplateComponent {
	_id?: string;
	id: string;
	version: number;
	type: 'Image' | 'Paragraph' | 'Signature' | 'Header' | 'Section' | 'TemplateContentSection' | 'UserContentSection';
	alignment?: 'left' | 'right' | 'center' | 'justify';
	meta?: Meta;
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
	paragraphId?: string;
	paragraph?: Paragraph;
	type: 'Paragraph';
}
export interface Template {
	_id?: string;
	id: string;
	templateComponentIds?: string[];
	templateComponents?: TemplateComponent[];
	meta?: Meta;
	version: number;
}

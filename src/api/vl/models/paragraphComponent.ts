import { Meta } from './meta';
import { OptionsList } from './optionsList';

export interface ParagraphComponent {
	_id?: string;
	id: string;
	type: 'StaticText' | 'BulletPoints' | 'Dropdown' | 'EditableText';
	meta?: Meta;
}

export interface StaticText extends ParagraphComponent {
	textFirstPerson?: string;
	textThirdPerson?: string;
}

export interface EditableText extends ParagraphComponent {
	id: string;
	placeholder?: string;
	required?: boolean;
	minLength?: number;
	maxLength?: number;
}

export interface BulletPoint {
	id: string;
	placeholder?: string;
	required?: boolean;
	minLength?: number;
	maxLength?: number;
}

export interface BulletPoints extends ParagraphComponent {
	bulletPoints?: BulletPoint[];
}

export interface Dropdown extends ParagraphComponent {
	minSelect?: number;
	maxSelect?: number;
	optionsListId: string;
	optionsList?: OptionsList;
}

import { ParagraphComponent } from './paragraphComponent';

export interface Paragraph {
	id: string;
	summary?: string;
	verticalHeight?: number;
	topicsOneOf?: string[];
	topicsAllOf?: string[];
	topicsNoneOf?: string[];
	isAutomaticallyIncluded?: boolean;
	group?: string;
	paragraphComponents?: ParagraphComponent[];
	types?: string[];
}

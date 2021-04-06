import { Meta } from './meta';
import { ParagraphComponent } from './paragraphComponent';

export interface Paragraph {
	_id?: string;
	id: string;
	summary?: string;
	verticalHeight?: number;
	topic?: string;
	status?: string;
	topicsOneOf?: string[];
	topicsAllOf?: string[];
	topicsNoneOf?: string[];
	isAutomaticallyIncluded?: boolean;
	group?: string;
	paragraphComponentRefs?: string[]; // ID - reference
	paragraphComponents?: ParagraphComponent[];
	meta?: Meta;
}

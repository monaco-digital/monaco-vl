import { ParagraphComponent } from './paragraphComponent';
import { CaseTopic } from './caseTopic';

export interface ParagraphTopic {
	topicId: string;
	topic?: CaseTopic;
	value?: number;
}

export interface Paragraph {
	id: string;
	summary?: string;
	verticalHeight?: number;
	text?: string;
	topicsOneOf?: string[];
	topicsAllOf?: string[];
	topicsNoneOf?: string[];
	topics: ParagraphTopic[];
	isAutomaticallyIncluded?: boolean;
	group?: string;
	paragraphComponents?: ParagraphComponent[];
	types?: string[];
}

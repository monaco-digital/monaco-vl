import { Meta } from './meta';

export interface CaseTopic {
	_id?: string;
	id: string;
	topic?: string;
	name?: string;
	text?: string;
	parentTopics?: string[];
	subtopics?: string[];
	type?: string;
	meta?: Meta;
}

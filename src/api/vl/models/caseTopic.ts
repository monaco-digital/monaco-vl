export interface CaseTopic {
	id: string;
	topic?: string;
	name?: string;
	text?: string;
	parentTopics?: string[];
	subtopics?: string[];
	type?: string;
}

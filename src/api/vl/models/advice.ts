export interface Advice {
	id: string;
	status?: string;
	text: string;
	topic?: string;
	topicsOneOf?: string[];
	topicsAllOf?: string[];
	topicsNoneOf?: string[];
}

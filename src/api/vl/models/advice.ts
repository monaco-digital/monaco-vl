import { Meta } from './meta';

export interface Advice {
	_id?: string;
	id: string;
	status?: string;
	text: string;
	topic?: string;
	topicsOneOf?: string[];
	topicsAllOf?: string[];
	topicsNoneOf?: string[];
	meta?: Meta;
}

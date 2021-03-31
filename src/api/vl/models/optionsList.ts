import { Meta } from './meta';

type Option = {
	labelFirstPerson?: string;
	labelThirdPerson?: string;
	value?: string;
};

export interface OptionsList {
	_id?: string;
	id: string;
	options?: Option[];
	meta?: Meta;
}

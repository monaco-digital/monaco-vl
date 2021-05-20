type Option = {
	labelFirstPerson?: string;
	value?: string;
};

export interface OptionsList {
	id: string;
	options?: Option[];
}

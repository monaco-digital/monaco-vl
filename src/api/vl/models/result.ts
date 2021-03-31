export interface Error {
	code?: 'INSERT_ERROR' | 'UPDATE_ERROR' | 'REPLACE_ERROR' | 'DELETE_ERROR';
	message?: string;
}

export interface Result {
	success: boolean;
	error?: Error;
}

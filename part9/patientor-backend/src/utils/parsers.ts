import { Entry } from '../types';

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const parseString = (str: unknown): string => {
	if (!isString(str)) {
		throw new Error('Incorrect or missing string value');
	}

	return str;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
	if (!isString(date) || !isDate(date)) {
		throw new Error('Incorrect or missing date: ' + date);
	}
	return date;
};

const isEntry = (entry: unknown): entry is Entry => {
	if (!entry || typeof entry !== 'object') {
		throw new Error('Incorrect or missing data');
	}

	return (
		'description' in entry &&
		'date' in entry &&
		'specialist' in entry &&
		'diagnosisCodes' in entry
	);
};

export { isString, parseString, isDate, parseDate, isEntry };

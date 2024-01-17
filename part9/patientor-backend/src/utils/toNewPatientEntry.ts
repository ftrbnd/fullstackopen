import { Entry, Gender, NewPatientEntry } from '../types';
import { isEntry, isString, parseDate, parseString } from './parsers';

const isGender = (param: string): param is Gender => {
	return Object.values(Gender)
		.map((v) => v.toString())
		.includes(param);
};

const parseGender = (gender: unknown): Gender => {
	if (!isString(gender) || !isGender(gender)) {
		throw new Error('Incorrect or missing gender: ' + gender);
	}
	return gender;
};

const parseEntries = (entries: unknown): Entry[] => {
	if (!Array.isArray(entries) || entries.some((entry) => !isEntry(entry))) {
		throw new Error('Incorrect or missing entries: ' + entries);
	}

	return entries as Entry[];
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or missing data');
	}

	if (
		'name' in object &&
		'dateOfBirth' in object &&
		'ssn' in object &&
		'gender' in object &&
		'occupation' in object &&
		'entries' in object
	) {
		const newEntry: NewPatientEntry = {
			name: parseString(object.name),
			dateOfBirth: parseDate(object.dateOfBirth),
			ssn: parseString(object.ssn),
			gender: parseGender(object.gender),
			occupation: parseString(object.occupation),
			entries: parseEntries(object.entries),
		};

		return newEntry;
	}

	throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatientEntry;

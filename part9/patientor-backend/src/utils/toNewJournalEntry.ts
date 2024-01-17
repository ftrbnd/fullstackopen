import {
	Diagnosis,
	Discharge,
	HealthCheckEntry,
	HealthCheckRating,
	HospitalEntry,
	NewJournalEntry,
	OccupationalHealthcareEntry,
	SickLeave,
} from '../types';
import { isDate, isString, parseDate, parseString } from './parsers';

const isNumber = (num: unknown): num is number => {
	return !Number.isNaN(num) || typeof num === 'number';
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
	if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
		// we will just trust the data to be in correct form
		return [] as Array<Diagnosis['code']>;
	}

	return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
	return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
	if (!isNumber(rating) || !isHealthCheckRating(rating)) {
		throw new Error('Incorrect or missing health check rating: ' + rating);
	}

	return rating;
};

const parseDischarge = (discharge: unknown): Discharge => {
	if (!discharge || typeof discharge !== 'object') {
		throw new Error('Incorrect or missing discharge data');
	}

	if ('date' in discharge && 'criteria' in discharge) {
		if (
			!isString(discharge.date) ||
			!isDate(discharge.date) ||
			!isString(discharge.criteria)
		) {
			throw new Error(
				'Incorrect or missing discharge: ' + discharge.date + discharge.criteria
			);
		}

		return discharge as Discharge;
	}

	throw new Error('Incorrect data: some Discharge fields are missing');
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
	if (!sickLeave || typeof sickLeave !== 'object') {
		throw new Error('Incorrect or missing SickLeave data');
	}

	if ('startDate' in sickLeave && 'endDate' in sickLeave) {
		if (
			!isString(sickLeave.startDate) ||
			!isDate(sickLeave.startDate) ||
			!isString(sickLeave.endDate) ||
			!isDate(sickLeave.endDate)
		) {
			throw new Error(
				'Incorrect or missing Sick Leave dates: ' +
					sickLeave.startDate +
					sickLeave.endDate
			);
		}

		return sickLeave as SickLeave;
	}

	throw new Error('Incorrect data: some SickLeave fields are missing');
};

const parseType = (
	type: unknown
): 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare' => {
	if (
		!isString(type) ||
		(type !== 'HealthCheck' &&
			type !== 'Hospital' &&
			type !== 'OccupationalHealthcare')
	) {
		throw new Error('Invalid type: ' + type);
	}

	return type;
};

const toHealthCheckEntry = (
	entry: NewJournalEntry
): Pick<HealthCheckEntry, 'healthCheckRating' | 'type'> => {
	if ('healthCheckRating' in entry) {
		return {
			healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
			type: 'HealthCheck',
		};
	}

	throw new Error('HealthCheckEntry is missing some fields');
};

const toHospitalEntry = (
	entry: NewJournalEntry
): Pick<HospitalEntry, 'discharge' | 'type'> => {
	if ('discharge' in entry) {
		return {
			discharge: parseDischarge(entry.discharge),
			type: 'Hospital',
		};
	}

	throw new Error('HospitalEntry is missing some fields');
};

const toOccupationalHealthcareEntry = (
	entry: NewJournalEntry
): Pick<OccupationalHealthcareEntry, 'employerName' | 'sickLeave' | 'type'> => {
	if ('employerName' in entry && 'sickLeave' in entry) {
		return {
			employerName: parseString(entry.employerName),
			sickLeave: parseSickLeave(entry.sickLeave),
			type: 'OccupationalHealthcare',
		};
	}

	throw new Error('OccupationalHealthcareEntry is missing some fields');
};

const getRestOfEntry = (object: object) => {
	if ('type' in object) {
		const entryType = parseType(object.type);

		switch (entryType) {
			case 'HealthCheck':
				return toHealthCheckEntry(object as NewJournalEntry);
			case 'Hospital':
				return toHospitalEntry(object as NewJournalEntry);
			case 'OccupationalHealthcare':
				return toOccupationalHealthcareEntry(object as NewJournalEntry);
		}
	}

	throw new Error('Object does not have an Entry type');
};

const toNewJournalEntry = (object: unknown): NewJournalEntry => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or missing data');
	}

	if (
		'description' in object &&
		'date' in object &&
		'specialist' in object &&
		'diagnosisCodes' in object &&
		'type' in object
	) {
		const newEntry: NewJournalEntry = {
			description: parseString(object.description),
			date: parseDate(object.date),
			specialist: parseString(object.specialist),
			diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
			...getRestOfEntry(object),
		};

		return newEntry;
	}

	throw new Error('Incorrect data: some fields are missing');
};

export default toNewJournalEntry;

import patients from '../data/patients';
import { NewPatientEntry, NonSensitivePatient, Patient } from '../types';
import { v4 as uuid } from 'uuid';

const getEntries = (): Patient[] => {
	return patients;
};

const getOne = (patientId: string): Patient => {
	const patient = patients.find((p) => p.id === patientId);

	if (!patient) {
		throw new Error(`Patient with id "${patientId}" not found`);
	}

	return { ...patient, entries: [] };
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const addPatient = (entry: NewPatientEntry): Patient => {
	const newPatientEntry = {
		...entry,
		id: uuid(),
	};

	patients.push(newPatientEntry);
	return newPatientEntry;
};

export default {
	getEntries,
	getOne,
	getNonSensitiveEntries,
	addPatient,
};

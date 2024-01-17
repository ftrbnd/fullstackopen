import patients from '../data/patients';
import {
	Entry,
	NewJournalEntry,
	NewPatientEntry,
	NonSensitivePatient,
	Patient,
} from '../types';
import { v4 as uuid } from 'uuid';

const getEntries = (): Patient[] => {
	return patients;
};

const getOne = (patientId: string): Patient => {
	const patient = patients.find((p) => p.id === patientId);

	if (!patient) {
		throw new Error(`Patient with id "${patientId}" not found`);
	}

	return patient;
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

const addJournalEntry = (patientId: string, entry: NewJournalEntry): Entry => {
	const patient = patients.find((p) => p.id === patientId);
	if (!patient) {
		throw new Error(`Patient with id "${patientId}" not found`);
	}

	const newJournalEntry = {
		...entry,
		id: uuid(),
	};

	patient.entries.push(newJournalEntry);
	return newJournalEntry;
};

export default {
	getEntries,
	getOne,
	getNonSensitiveEntries,
	addPatient,
	addJournalEntry,
};

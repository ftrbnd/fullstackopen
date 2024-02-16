import axios from 'axios';
import { Entry, HealthCheckEntry, Patient, PatientFormValues } from '../types';
import { apiBaseUrl } from '../constants';

const getAll = async () => {
	const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

	return data;
};

const getOne = async (patientId: string) => {
	const { data } = await axios.get<Patient>(
		`${apiBaseUrl}/patients/${patientId}`
	);

	return data;
};

const create = async (object: PatientFormValues) => {
	const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

	return data;
};

const addEntry = async (patientId: string, object: HealthCheckEntry) => {
	const { data } = await axios.post<Entry>(
		`${apiBaseUrl}/patients/${patientId}/entries`,
		object
	);

	return data;
};

export default {
	getAll,
	getOne,
	create,
	addEntry,
};

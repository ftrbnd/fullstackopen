import { useEffect, useState } from 'react';
import patientService from '../../services/patients';
import { useLocation } from 'react-router-dom';
import { Diagnosis, NewJournalEntry, Patient } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import diagnosisService from '../../services/diagnoses';
import EntryDetails from './EntryDetails';
import axios from 'axios';
import { Button } from '@mui/material';
import AddEntryModal from '../AddEntryModal';

const PatientDetails = () => {
	const [patient, setPatient] = useState<Patient | null>(null);
	const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [error, setError] = useState<string>();

	const location = useLocation();

	useEffect(() => {
		const fetchPatient = async () => {
			const patient = await patientService.getOne(location.state.id);
			setPatient(patient);
		};

		const fetchDiagnoses = async () => {
			const data = await diagnosisService.getAll();
			setDiagnoses(data);
		};

		fetchPatient();
		fetchDiagnoses();
	}, [location.state.id]);

	const openModal = (): void => setModalOpen(true);

	const closeModal = (): void => {
		setModalOpen(false);
		setError(undefined);
	};

	const submitNewEntry = async (values: NewJournalEntry) => {
		if (!patient) return setError('This patient does not exist');

		try {
			const entry = await patientService.addEntry(patient.id, values);

			const newPatient = {
				...patient,
				entries: patient.entries.concat(entry),
			};

			setPatient(newPatient);
			setModalOpen(false);
			setError(undefined);
		} catch (e: unknown) {
			if (axios.isAxiosError(e)) {
				if (e?.response?.data && typeof e?.response?.data === 'string') {
					const message = e.response.data.replace(
						'Something went wrong. Error: ',
						''
					);
					console.error(message);
					setError(message);
				} else {
					setError('Unrecognized axios error');
				}
			} else {
				console.error('Unknown error', e);
				setError('Unknown error');
			}
		}
	};

	if (!patient) return <div>Patient not found</div>;

	return (
		<div>
			<div>
				<h2>
					{patient.name}

					{patient.gender === 'male' ? (
						<MaleIcon />
					) : patient.gender === 'female' ? (
						<FemaleIcon />
					) : (
						<TransgenderIcon />
					)}
				</h2>
			</div>
			<p>ssn: {patient.ssn}</p>
			<p>occupation: {patient.occupation}</p>
			<div>
				<h3>Entries</h3>
				{patient.entries.map((entry) => (
					<EntryDetails
						key={entry.id}
						entry={entry}
						diagnoses={diagnoses}
					/>
				))}

				<AddEntryModal
					modalOpen={modalOpen}
					onSubmit={submitNewEntry}
					error={error}
					onClose={closeModal}
				/>
				<Button
					variant='contained'
					onClick={() => openModal()}>
					Add New Entry
				</Button>
			</div>
		</div>
	);
};

export default PatientDetails;

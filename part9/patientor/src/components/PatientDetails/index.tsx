import { useEffect, useState } from 'react';
import patientService from '../../services/patients';
import { useLocation } from 'react-router-dom';
import { Diagnosis, Patient } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import diagnosisService from '../../services/diagnoses';
import EntryDetails from './EntryDetails';

const PatientDetails = () => {
	const [patient, setPatient] = useState<Patient | null>(null);
	const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

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
			</div>
		</div>
	);
};

export default PatientDetails;

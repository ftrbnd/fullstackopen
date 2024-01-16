import { useEffect, useState } from 'react';
import patientService from '../services/patients';
import { useLocation } from 'react-router-dom';
import { Patient } from '../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

const PatientDetail = () => {
	const [patient, setPatient] = useState<Patient | null>(null);
	const location = useLocation();

	useEffect(() => {
		const fetchPatient = async () => {
			const patient = await patientService.getOne(location.state.id);
			setPatient(patient);
		};

		void fetchPatient();
	}, [location.state.id]);

	if (!patient) return <div>Patient not found</div>;

	return (
		<div>
			<div>
				<h2>{patient.name}</h2>
				<p>
					gender:
					{patient.gender === 'male' ? (
						<MaleIcon />
					) : patient.gender === 'female' ? (
						<FemaleIcon />
					) : (
						<TransgenderIcon />
					)}
				</p>
			</div>
			<p>ssn: {patient.ssn}</p>
			<p>occupation: {patient.occupation}</p>
		</div>
	);
};

export default PatientDetail;

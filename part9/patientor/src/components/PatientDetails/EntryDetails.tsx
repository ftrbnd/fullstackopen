import { Container } from '@mui/material';
import {
	Diagnosis,
	Entry,
	HealthCheckEntry,
	HospitalEntry,
	OccupationalHealthcareEntry,
} from '../../types';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface EntryProps {
	entry: Entry;
	diagnoses: Diagnosis[];
}

const HealthCheckEntryDetail = ({ entry }: { entry: HealthCheckEntry }) => {
	return (
		<div>
			<MonitorHeartIcon />
			Health check rating: {entry.healthCheckRating}
		</div>
	);
};

const HospitalEntryDetail = ({ entry }: { entry: HospitalEntry }) => {
	return (
		<div>
			<LocalHospitalIcon />
			Discharged: {entry.discharge.date} - {entry.discharge.criteria}
		</div>
	);
};

const OccupationalHealthcareDetail = ({
	entry,
}: {
	entry: OccupationalHealthcareEntry;
}) => {
	return (
		<div>
			<BusinessCenterIcon />
			<p>Employed by: {entry.employerName}</p>
			{entry.sickLeave && (
				<p>
					Sick leave: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}
				</p>
			)}
		</div>
	);
};

const assertNever = (value: never): never => {
	throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

const EntryDetails = ({ entry, diagnoses }: EntryProps) => {
	const EntryType = () => {
		switch (entry.type) {
			case 'HealthCheck':
				return <HealthCheckEntryDetail entry={entry} />;
			case 'Hospital':
				return <HospitalEntryDetail entry={entry} />;
			case 'OccupationalHealthcare':
				return <OccupationalHealthcareDetail entry={entry} />;
			default:
				return assertNever(entry);
		}
	};

	return (
		<Container sx={{ border: '1px solid black' }}>
			<p>
				{entry.date} - <em>{entry.description}</em>
			</p>
			<ul>
				{entry.diagnosisCodes?.map((code) => (
					<li key={code}>
						{code} {diagnoses.find((d) => d.code === code)?.name}
					</li>
				))}
			</ul>
			{EntryType()}
			<p>diagnosed by {entry.specialist}</p>
		</Container>
	);
};

export default EntryDetails;

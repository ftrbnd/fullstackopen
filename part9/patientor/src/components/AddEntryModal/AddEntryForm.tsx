import { useState, SyntheticEvent } from 'react';
import {
	TextField,
	InputLabel,
	MenuItem,
	Select,
	Grid,
	Button,
	SelectChangeEvent,
	Tabs,
	Tab,
	OutlinedInput,
	FormControl,
} from '@mui/material';
import { NewJournalEntry, HealthCheckRating, Diagnosis } from '../../types';
import CustomTabPanel from './CustomTabPanel';

interface Props {
	onCancel: () => void;
	onSubmit: (values: NewJournalEntry) => void;
	diagnoses: Diagnosis[];
}

interface HealthCheckRatingOption {
	value: HealthCheckRating;
	label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.values(
	HealthCheckRating
)
	.filter((v) => typeof v === 'number')
	.map((v) => ({
		value: parseInt(v as string),
		label: v.toString(),
	}));

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
	const [description, setDescription] = useState('');
	const [date, setDate] = useState('');
	const [specialist, setSpecialist] = useState('');
	const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

	const [healthCheckRating, setHealthCheckRating] = useState(
		HealthCheckRating.Healthy
	);
	const [employerName, setEmployerName] = useState('');
	const [sickLeaveStart, setSickLeaveStart] = useState('');
	const [sickLeaveEnd, setSickLeaveEnd] = useState('');
	const [dischargeDate, setDischargeDate] = useState('');
	const [dischargeCriteria, setDischargeCriteria] = useState('');

	const [tab, setTab] = useState(0);

	const onRatingChange = (event: SelectChangeEvent<string>) => {
		event.preventDefault();

		if (typeof event.target.value === 'number') {
			const value = parseInt(event.target.value);
			const ratings = Object.values(HealthCheckRating).filter(
				(value) => typeof value === 'number'
			) as number[];

			const rating = ratings.find((r) => r === value);

			if (rating) {
				setHealthCheckRating(rating);
			}
		}
	};

	const handleDiagnosisCodeChange = (
		event: SelectChangeEvent<typeof diagnosisCodes>
	) => {
		const value = event.target.value;
		setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
	};

	const addEntry = (event: SyntheticEvent) => {
		event.preventDefault();

		switch (tab) {
			case 0:
				onSubmit({
					description,
					date,
					specialist,
					diagnosisCodes: diagnosisCodes,
					type: 'HealthCheck',
					healthCheckRating,
				});
				break;
			case 1:
				onSubmit({
					description,
					date,
					specialist,
					diagnosisCodes: diagnosisCodes,
					type: 'OccupationalHealthcare',
					employerName,
					sickLeave: {
						startDate: sickLeaveStart,
						endDate: sickLeaveEnd,
					},
				});
				break;
			case 2:
				onSubmit({
					description,
					date,
					specialist,
					diagnosisCodes: diagnosisCodes,
					type: 'Hospital',
					discharge: {
						date: dischargeDate,
						criteria: dischargeCriteria,
					},
				});
		}
	};

	return (
		<div>
			<form onSubmit={addEntry}>
				<TextField
					label='Description'
					fullWidth
					value={description}
					onChange={({ target }) => setDescription(target.value)}
				/>
				<TextField
					label='Date'
					placeholder='YYYY-MM-DD'
					fullWidth
					value={date}
					onChange={({ target }) => setDate(target.value)}
				/>
				<TextField
					label='Specialist'
					fullWidth
					value={specialist}
					onChange={({ target }) => setSpecialist(target.value)}
				/>

				<FormControl fullWidth>
					<InputLabel id='diagnosis-codes-label'>Diagnosis Codes</InputLabel>
					<Select
						labelId='diagnosis-codes-label'
						id='diagnosis-codes'
						multiple
						fullWidth
						value={diagnosisCodes}
						onChange={handleDiagnosisCodeChange}
						input={<OutlinedInput label='Diagnosis' />}>
						{diagnoses.map((diagnosis) => (
							<MenuItem
								key={diagnosis.code}
								value={diagnosis.code}>
								{diagnosis.code}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<Tabs
					value={tab}
					onChange={(_e, val) => setTab(val)}
					aria-label='journal entry tabs'>
					<Tab
						label='HealthCheck'
						{...a11yProps(0)}
					/>
					<Tab
						label='Occupational'
						{...a11yProps(1)}
					/>
					<Tab
						label='Hospital'
						{...a11yProps(2)}
					/>
				</Tabs>

				<CustomTabPanel
					value={tab}
					index={0}>
					<InputLabel style={{ marginTop: 20 }}>HealthCheck Rating</InputLabel>
					<Select
						label='HealthCheck Rating'
						fullWidth
						value={healthCheckRating.toString()}
						onChange={onRatingChange}>
						{healthCheckRatingOptions.map((option) => (
							<MenuItem
								key={option.label}
								value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</Select>
				</CustomTabPanel>
				<CustomTabPanel
					value={tab}
					index={1}>
					<TextField
						label='Employer Name'
						fullWidth
						value={employerName}
						onChange={({ target }) => setEmployerName(target.value)}
					/>
					<TextField
						label='Sick Leave Start'
						placeholder='YYYY-MM-DD'
						fullWidth
						value={sickLeaveStart}
						onChange={({ target }) => setSickLeaveStart(target.value)}
					/>
					<TextField
						label='Sick Leave End'
						placeholder='YYYY-MM-DD'
						fullWidth
						value={sickLeaveEnd}
						onChange={({ target }) => setSickLeaveEnd(target.value)}
					/>
				</CustomTabPanel>
				<CustomTabPanel
					value={tab}
					index={2}>
					<TextField
						label='Discharge Date'
						placeholder='YYYY-MM-DD'
						fullWidth
						value={dischargeDate}
						onChange={({ target }) => setDischargeDate(target.value)}
					/>
					<TextField
						label='Discharge Criteria'
						fullWidth
						value={dischargeCriteria}
						onChange={({ target }) => setDischargeCriteria(target.value)}
					/>
				</CustomTabPanel>

				<Grid>
					<Grid item>
						<Button
							color='secondary'
							variant='contained'
							style={{ float: 'left' }}
							type='button'
							onClick={onCancel}>
							Cancel
						</Button>
					</Grid>
					<Grid item>
						<Button
							style={{
								float: 'right',
							}}
							type='submit'
							variant='contained'>
							Add
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default AddEntryForm;

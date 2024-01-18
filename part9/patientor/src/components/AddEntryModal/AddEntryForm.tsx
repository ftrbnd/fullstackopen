import { useState, SyntheticEvent } from 'react';

import {
	TextField,
	InputLabel,
	MenuItem,
	Select,
	Grid,
	Button,
	SelectChangeEvent,
} from '@mui/material';

import { HealthCheckEntryFormValues, HealthCheckRating } from '../../types';

interface Props {
	onCancel: () => void;
	onSubmit: (values: HealthCheckEntryFormValues) => void;
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

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
	const [description, setDescription] = useState('');
	const [date, setDate] = useState('');
	const [specialist, setSpecialist] = useState('');
	const [diagnosisCodes, setDiagnosisCodes] = useState('');
	const [healthCheckRating, setHealthCheckRating] = useState(
		HealthCheckRating.Healthy
	);

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

	const addEntry = (event: SyntheticEvent) => {
		event.preventDefault();
		onSubmit({
			description,
			date,
			specialist,
			diagnosisCodes: diagnosisCodes.split(','),
			type: 'HealthCheck',
			healthCheckRating,
		});
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
				<TextField
					label='Diagnosis codes'
					fullWidth
					value={diagnosisCodes}
					onChange={({ target }) => setDiagnosisCodes(target.value)}
				/>

				<InputLabel style={{ marginTop: 20 }}>HealthCheck rating</InputLabel>
				<Select
					label='HealthCheck rating'
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

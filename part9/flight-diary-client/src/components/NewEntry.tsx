import React, { Dispatch, SetStateAction, useState } from 'react';
import { createDiary } from '../services/diaryEntryService';
import { DiaryEntry, Visibility, Weather } from '../types';
import axios from 'axios';

interface NewEntryProps {
	setDiaries: Dispatch<SetStateAction<DiaryEntry[]>>;
}

const NewEntry = ({ setDiaries }: NewEntryProps) => {
	const [date, setDate] = useState('');
	const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
	const [weather, setWeather] = useState<Weather>(Weather.Sunny);
	const [comment, setComment] = useState('');
	const [error, setError] = useState('');

	const diaryCreation = async (event: React.SyntheticEvent) => {
		event.preventDefault();

		try {
			const newDiary = await createDiary({
				date,
				visibility,
				weather,
				comment,
			});

			setDiaries((prev) => prev.concat(newDiary));
		} catch (err) {
			if (axios.isAxiosError(err)) {
				console.log(err.status);
				console.error(err.response);

				setError(err.response?.data);
			} else {
				console.error(error);
			}
		}

		setDate('');
		setVisibility(Visibility.Great);
		setWeather(Weather.Sunny);
		setComment('');
	};

	return (
		<form onSubmit={diaryCreation}>
			<h2>New Entry</h2>
			{error && <p className='error'>{error}</p>}
			<div>
				date
				<input
					type='date'
					value={date}
					onChange={(event) => setDate(event.target.value)}
				/>
			</div>
			<fieldset>
				<legend>visibility</legend>

				<div>
					<label>
						Great
						<input
							defaultChecked
							type='radio'
							name='visibility'
							value={visibility}
							onChange={() => setVisibility(Visibility.Great)}
						/>
					</label>
				</div>

				<div>
					<label>
						Good
						<input
							type='radio'
							name='visibility'
							value={visibility}
							onChange={() => setVisibility(Visibility.Good)}
						/>
					</label>
				</div>

				<div>
					<label>
						Ok
						<input
							type='radio'
							name='visibility'
							value={visibility}
							onChange={() => setVisibility(Visibility.Ok)}
						/>
					</label>
				</div>

				<div>
					<label>
						Poor
						<input
							type='radio'
							name='visibility'
							value={visibility}
							onChange={() => setVisibility(Visibility.Poor)}
						/>
					</label>
				</div>
			</fieldset>

			<fieldset>
				<legend>weather</legend>

				<div>
					<label>
						Sunny
						<input
							defaultChecked
							type='radio'
							name='weather'
							value={weather}
							onChange={() => setWeather(Weather.Sunny)}
						/>
					</label>
				</div>

				<div>
					<label>
						Rainy
						<input
							type='radio'
							name='weather'
							value={weather}
							onChange={() => setWeather(Weather.Rainy)}
						/>
					</label>
				</div>

				<div>
					<label>
						Cloudy
						<input
							type='radio'
							name='weather'
							value={weather}
							onChange={() => setWeather(Weather.Cloudy)}
						/>
					</label>
				</div>

				<div>
					<label>
						Stormy
						<input
							type='radio'
							name='weather'
							value={weather}
							onChange={() => setWeather(Weather.Stormy)}
						/>
					</label>
				</div>

				<div>
					<label>
						Windy
						<input
							type='radio'
							name='weather'
							value={weather}
							onChange={() => setWeather(Weather.Windy)}
						/>
					</label>
				</div>
			</fieldset>

			<div>
				comment
				<input
					value={comment}
					onChange={(event) => setComment(event.target.value)}
				/>
			</div>
			<button type='submit'>add</button>
		</form>
	);
};

export default NewEntry;

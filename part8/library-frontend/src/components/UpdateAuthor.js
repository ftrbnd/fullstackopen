import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../services/queries';

const UpdateAuthor = ({ authors }) => {
	const [name, setName] = useState(authors[0].name);
	const [year, setYear] = useState('');

	const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
		refetchQueries: [{ query: ALL_AUTHORS }],
	});

	const submit = async (event) => {
		event.preventDefault();

		updateAuthor({
			variables: { name, setBornTo: parseInt(year) },
		});

		setYear('');
	};

	return (
		<div>
			<form onSubmit={submit}>
				<h2>Set birthyear</h2>
				<div>
					name
					<select
						defaultValue={authors[0].name}
						onChange={({ target }) => setName(target.value)}>
						{authors.map((a) => (
							<option key={a.id}>{a.name}</option>
						))}
					</select>
				</div>
				<div>
					year
					<input
						type='number'
						value={year}
						onChange={({ target }) => setYear(target.value)}
					/>
				</div>
				<button type='submit'>update author</button>
			</form>
		</div>
	);
};

export default UpdateAuthor;

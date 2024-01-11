import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../services/queries';
import { useEffect, useState } from 'react';

const Books = ({ show }) => {
	const [genres, setGenres] = useState([]);
	const [filter, setFilter] = useState('');

	const filteredBooksResult = useQuery(ALL_BOOKS, {
		variables: { genre: filter },
	});
	const allBooksResult = useQuery(ALL_BOOKS);

	useEffect(() => {
		if (allBooksResult.data) {
			const bookGenres = [];
			const uniqueGenres = [];

			allBooksResult.data.allBooks.forEach((book) => {
				bookGenres.push(...book.genres);
			});

			bookGenres.forEach((genre) => {
				if (!uniqueGenres.includes(genre)) {
					uniqueGenres.push(genre);
				}
			});

			setGenres(uniqueGenres);
		}
	}, [allBooksResult.data]);

	if (!show) {
		return null;
	}

	if (filteredBooksResult.loading) {
		return <div>loading...</div>;
	}

	return (
		<div>
			<h2>books</h2>

			<table>
				<tbody>
					<tr>
						<th>title</th>
						<th>author</th>
						<th>published</th>
					</tr>
					{filteredBooksResult.data.allBooks.map((a) => (
						<tr key={a.id}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td>{a.published}</td>
						</tr>
					))}
				</tbody>
			</table>

			<div>
				{genres.map((genre, i) => (
					<button
						key={i}
						onClick={() => setFilter(genre)}>
						{genre}
					</button>
				))}
				<button onClick={() => setFilter('')}>ALL</button>
			</div>
		</div>
	);
};

export default Books;

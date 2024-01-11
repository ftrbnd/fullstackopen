import { useQuery } from '@apollo/client';
import { ALL_BOOKS, CURRENT_USER } from '../services/queries';

const Recommend = ({ show }) => {
	const result = useQuery(ALL_BOOKS);
	const myUser = useQuery(CURRENT_USER);

	if (!show) {
		return null;
	}

	return (
		<div>
			<h2>recommendations</h2>
			<p>
				books in your favorite genre{' '}
				<strong>{myUser.data.me.favoriteGenre}</strong>
			</p>

			<table>
				<tbody>
					<tr>
						<th>title</th>
						<th>author</th>
						<th>published</th>
					</tr>
					{result.data.allBooks
						.filter((book) =>
							book.genres.includes(myUser.data.me.favoriteGenre)
						)
						.map((book) => (
							<tr key={book.id}>
								<td>{book.title}</td>
								<td>{book.author.name}</td>
								<td>{book.published}</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default Recommend;

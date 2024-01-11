import { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import { useApolloClient } from '@apollo/client';
import Recommend from './components/Recommend';

const App = () => {
	const [page, setPage] = useState('authors');
	const [token, setToken] = useState(null);
	const [error, setError] = useState(null);

	const client = useApolloClient();

	const logout = () => {
		setToken(null);
		localStorage.clear();
		client.resetStore();
	};

	return (
		<div>
			{error && error}

			<div>
				<button onClick={() => setPage('authors')}>authors</button>
				<button onClick={() => setPage('books')}>books</button>
				{token ? (
					<>
						<button onClick={() => setPage('add')}>add book</button>
						<button onClick={() => setPage('recommend')}>recommend</button>
						<button onClick={logout}>logout</button>
					</>
				) : (
					<button onClick={() => setPage('login')}>login</button>
				)}
			</div>

			<Authors
				show={page === 'authors'}
				setError={setError}
			/>

			<Books show={page === 'books'} />

			{token ? (
				<>
					<NewBook show={page === 'add'} />
					<Recommend show={page === 'recommend'} />
				</>
			) : (
				<LoginForm
					show={page === 'login'}
					setError={setError}
					setToken={setToken}
				/>
			)}
		</div>
	);
};

export default App;

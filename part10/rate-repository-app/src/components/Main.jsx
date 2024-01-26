import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../utils/theme';
import SignIn from './SignIn';
import RepositoryItem from './RepositoryItem';
import CreateReview from './CreateReview';
import SignUp from './SignUp';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.mainBackground,
		flexGrow: 1,
		flexShrink: 1,
	},
});

const Main = () => {
	return (
		<View style={styles.container}>
			<AppBar />
			<Routes>
				<Route
					path='/'
					element={<RepositoryList />}
				/>
				<Route
					path='/signin'
					element={<SignIn />}
				/>
				<Route
					path='/signup'
					element={<SignUp />}
				/>
				<Route
					path='/repositories/:id'
					element={<RepositoryItem />}
				/>
				<Route
					path='/review'
					element={<CreateReview />}
				/>
				<Route
					path='/reviews'
					element={<MyReviews />}
				/>
				<Route
					path='*'
					element={
						<Navigate
							to='/'
							replace
						/>
					}
				/>
			</Routes>
		</View>
	);
};

export default Main;

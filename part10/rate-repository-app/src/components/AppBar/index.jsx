import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../../utils/theme';
import { useApolloClient } from '@apollo/client';
import useAuthStorage from '../../hooks/useAuthStorage';
import useCurrentUser from '../../hooks/useCurrentUser';

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		backgroundColor: theme.colors.backgroundColor,
		padding: 16,
		display: 'flex',
		flexDirection: 'row',
	},
});

const AppBar = () => {
	const { currentUser } = useCurrentUser({ includeReviews: false });
	const authStorage = useAuthStorage();
	const apolloClient = useApolloClient();

	const signOut = async () => {
		await authStorage.removeAccessToken();
		await apolloClient.resetStore();
	};

	return (
		<View style={styles.container}>
			<ScrollView horizontal>
				<AppBarTab
					text={'Repositories'}
					to={'/'}
				/>
				{currentUser ? (
					<>
						<AppBarTab
							text={'Create Review'}
							to={'/review'}
						/>
						<AppBarTab
							text={'My Reviews'}
							to={'/reviews'}
						/>
						<AppBarTab
							text={'Sign Out'}
							onPress={() => signOut()}
							to={'/'}
						/>
					</>
				) : (
					<>
						<AppBarTab
							text={'Sign In'}
							to={'/signin'}
						/>
						<AppBarTab
							text={'Sign Up'}
							to={'/signup'}
						/>
					</>
				)}
			</ScrollView>
		</View>
	);
};

export default AppBar;

import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../../utils/theme';
import { useApolloClient, useQuery } from '@apollo/client';
import { ME } from '../../graphql/queries';
import useAuthStorage from '../../hooks/useAuthStorage';

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
	const { data } = useQuery(ME, {
		fetchPolicy: 'cache-and-network',
	});
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
				{data.me ? (
					<AppBarTab
						text={'Sign Out'}
						onPress={() => signOut()}
						to={'/'}
					/>
				) : (
					<AppBarTab
						text={'Sign In'}
						to={'/signin'}
					/>
				)}
			</ScrollView>
		</View>
	);
};

export default AppBar;

import { View, StyleSheet, Image, Pressable } from 'react-native';
import CountItem from './CountItem';
import LanguageTag from './LanguageTag';
import Text from '../Text';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../../graphql/queries';
import * as Linking from 'expo-linking';
import theme from '../../utils/theme';

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		padding: 8,
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
		padding: 12,
	},
	image: {
		height: 50,
		width: 50,
		borderRadius: 10,
	},
	details: {
		flex: 1,
		alignItems: 'start',
		display: 'flex',
		padding: 8,
		paddingTop: 0,
	},
	detailItem: {
		marginBottom: 4,
	},
	counts: {
		display: 'flex',
		flexDirection: 'row',
		marginBottom: 8,
	},
	button: {
		backgroundColor: theme.colors.primary,
		padding: 12,
		borderRadius: 5,
	},
	text: {
		color: 'white',
		alignSelf: 'center',
	},
});

const RepositoryDetails = ({ repository, children }) => {
	return (
		<View
			testID='repositoryItem'
			style={styles.container}>
			<View style={styles.row}>
				<Image
					source={{ uri: repository.ownerAvatarUrl }}
					style={styles.image}
				/>
				<View style={styles.details}>
					<Text
						style={styles.detailItem}
						fontSize={'heading'}
						fontWeight={'bold'}>
						{repository.fullName}
					</Text>
					<Text
						style={styles.detailItem}
						fontSize={'body'}
						color={'textSecondary'}>
						{repository.description}
					</Text>
					<LanguageTag language={repository.language} />
				</View>
			</View>
			<View style={styles.counts}>
				<CountItem
					label={'Forks'}
					count={repository.forksCount}
				/>
				<CountItem
					label={'Stars'}
					count={repository.stargazersCount}
				/>
				<CountItem
					label={'Rating'}
					count={repository.ratingAverage}
				/>
				<CountItem
					label={'Reviews'}
					count={repository.reviewCount}
				/>
			</View>

			{children}
		</View>
	);
};

const RepositoryView = ({ id }) => {
	const { data, loading } = useQuery(GET_REPOSITORY, {
		variables: { id },
	});

	const openLink = async () => {
		await Linking.openURL(data.repository.url);
	};

	if (loading) {
		return (
			<View>
				<Text>Getting repository...</Text>
			</View>
		);
	}

	return (
		<RepositoryDetails repository={data.repository}>
			<Pressable
				onPress={openLink}
				style={styles.button}>
				<Text
					style={styles.text}
					fontWeight={'bold'}>
					Open in GitHub
				</Text>
			</Pressable>
		</RepositoryDetails>
	);
};

const RepositoryItem = ({ repository }) => {
	const { id } = useParams();

	if (id) return <RepositoryView id={id} />;

	return <RepositoryDetails repository={repository} />;
};

export default RepositoryItem;

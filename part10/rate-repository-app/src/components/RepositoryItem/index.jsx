import { View, StyleSheet, Image } from 'react-native';
import CountItem from './CountItem';
import LanguageTag from './LanguageTag';
import Text from '../Text';

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
	},
});

const RepositoryItem = ({ repository }) => {
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
		</View>
	);
};

export default RepositoryItem;

import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import theme from '../utils/theme';
import Text from './Text';
import { format } from 'date-fns';

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
	review: {
		display: 'flex',
		flexDirection: 'row',
		padding: 8,
	},
	circle: {
		alignSelf: 'flex-start',
		width: 50,
		height: 50,
		margin: 8,
		borderRadius: 25,
		borderWidth: 2,
		borderColor: theme.colors.primary,
		display: 'flex',
		justifyContent: 'center',
	},
	rating: {
		textAlign: 'center',
		color: theme.colors.primary,
	},
	header: {
		display: 'flex',
		paddingVertical: 8,
	},
	content: {
		flex: 1,
	},
	separator: {
		height: 10,
		backgroundColor: 'lightgrey',
	},
});

const ReviewItem = ({ review, byCurrentUser }) => {
	console.log('cur review:', review);
	// Single review item
	return (
		<View style={styles.review}>
			<View style={styles.circle}>
				<Text
					style={styles.rating}
					fontSize={'subheading'}
					fontWeight={'bold'}>
					{review.rating}
				</Text>
			</View>
			<View style={styles.content}>
				<View style={styles.header}>
					<Text
						fontSize={'heading'}
						fontWeight={'bold'}>
						{byCurrentUser ? review.repository.fullName : review.user.username}
					</Text>
					<Text
						fontSize={'subheading'}
						color={'textSecondary'}>
						{format(new Date(review.createdAt), 'dd.MM.yyyy')}
					</Text>
				</View>
				<Text fontSize={'body'}>{review.text}</Text>
			</View>
		</View>
	);
};

export default ReviewItem;

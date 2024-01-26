import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import theme from '../utils/theme';
import Text from './Text';
import { format } from 'date-fns';
import { Button } from 'react-native-paper';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
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
	actions: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		padding: 8,
	},
});

const ReviewItem = ({ review, byCurrentUser, handleDelete }) => {
	return (
		<View>
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
							{byCurrentUser
								? review.repository.fullName
								: review.user.username}
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
			{byCurrentUser && (
				<View style={styles.actions}>
					<Link to={`/repositories/${review.repository.id}`}>
						<Button
							mode='contained'
							buttonColor={theme.colors.primary}>
							View Repository
						</Button>
					</Link>
					<Button
						onPress={handleDelete}
						mode='contained'
						buttonColor={theme.colors.error}>
						Delete Review
					</Button>
				</View>
			)}
		</View>
	);
};

export default ReviewItem;

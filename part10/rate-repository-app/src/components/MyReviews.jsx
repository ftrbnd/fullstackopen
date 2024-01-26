import { Alert, FlatList, StyleSheet, View } from 'react-native';
import useCurrentUser from '../hooks/useCurrentUser';
import ReviewItem from './ReviewItem';
import { useApolloClient, useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
	separator: {
		height: 10,
		backgroundColor: 'lightgrey',
	},
	search: {
		margin: 8,
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
	const { currentUser } = useCurrentUser({ includeReviews: true });
	const [deleteReview] = useMutation(DELETE_REVIEW);
	const apolloClient = useApolloClient();

	const handleDelete = (deleteReviewId) => {
		console.log(`want to delete:`, deleteReviewId);
		Alert.alert(
			'Delete Review',
			'Are you sure you want to delete this review?',
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: 'OK',
					onPress: async () => {
						await deleteReview({ variables: { deleteReviewId } });
						await apolloClient.resetStore();
					},
				},
			]
		);
	};

	const reviewNodes = currentUser
		? currentUser.reviews.edges.map((edge) => edge.node)
		: [];

	return (
		<FlatList
			data={reviewNodes}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({ item }) => (
				<ReviewItem
					review={item}
					byCurrentUser={true}
					handleDelete={() => handleDelete(item.id)}
				/>
			)}
		/>
	);
};

export default MyReviews;

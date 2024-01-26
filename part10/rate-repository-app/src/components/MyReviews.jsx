import { FlatList, StyleSheet, View } from 'react-native';
import useCurrentUser from '../hooks/useCurrentUser';
import ReviewItem from './ReviewItem';

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

	console.log('my reviews:', currentUser);

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
				/>
			)}
		/>
	);
};

export default MyReviews;

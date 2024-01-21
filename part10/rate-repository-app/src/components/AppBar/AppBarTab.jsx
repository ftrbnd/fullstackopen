import Text from '../Text';
import { StyleSheet, Pressable } from 'react-native';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
	tab: {
		color: 'white',
		padding: 8,
	},
});

const AppBarTab = ({ text, to, onPress }) => {
	return (
		<Pressable>
			<Link
				to={to}
				onPress={onPress}>
				<Text
					fontWeight={'bold'}
					style={styles.tab}>
					{text}
				</Text>
			</Link>
		</Pressable>
	);
};

export default AppBarTab;

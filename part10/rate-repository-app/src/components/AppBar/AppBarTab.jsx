import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Text from '../Text';
import { StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
	tab: {
		color: 'white',
		padding: 8,
	},
});

const AppBarTab = ({ text, to }) => {
	return (
		<Pressable>
			<Link to={to}>
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

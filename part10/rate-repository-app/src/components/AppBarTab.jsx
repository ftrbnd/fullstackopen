import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Text from './Text';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	tab: {
		color: 'white',
		padding: 8,
	},
});

const AppBarTab = ({ text }) => {
	return (
		<Pressable>
			<Text
				fontWeight={'bold'}
				style={styles.tab}>
				{text}
			</Text>
		</Pressable>
	);
};

export default AppBarTab;

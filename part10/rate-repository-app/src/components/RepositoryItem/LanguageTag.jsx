import { StyleSheet, View } from 'react-native';
import Text from '../Text';
import theme from '../../utils/theme';

const styles = StyleSheet.create({
	tag: {
		backgroundColor: theme.colors.primary,
		padding: 4,
		borderRadius: 5,
	},
	text: {
		color: 'white',
	},
});

const LanguageTag = ({ language }) => {
	return (
		<View style={styles.tag}>
			<Text style={styles.text}>{language}</Text>
		</View>
	);
};

export default LanguageTag;

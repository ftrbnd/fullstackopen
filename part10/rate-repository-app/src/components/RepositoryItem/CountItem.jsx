import { View, StyleSheet } from 'react-native';
import Text from '../Text';

const styles = StyleSheet.create({
	countItem: {
		flex: 1,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

const CountItem = ({ label, count }) => {
	const getCountDisplayValue = () => {
		if (count >= 1000) {
			const thousandValue = Math.floor(count / 1000);
			const hundredValue = Math.floor(count / 100) % 10;

			return hundredValue
				? `${thousandValue}.${hundredValue}k`
				: `${thousandValue}k`;
		}

		return count;
	};

	return (
		<View style={styles.countItem}>
			<Text fontWeight={'bold'}>{getCountDisplayValue()}</Text>
			<Text color={'textSecondary'}>{label}</Text>
		</View>
	);
};

export default CountItem;

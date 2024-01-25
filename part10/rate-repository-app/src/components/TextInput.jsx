import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../utils/theme';

const styles = StyleSheet.create({
	errorBorder: {
		borderWidth: 1,
		borderColor: theme.colors.error,
	},
});

const TextInput = ({ style, placeholder, error, ...props }) => {
	const textInputStyle = [style, error && styles.errorBorder];

	return (
		<NativeTextInput
			placeholder={placeholder}
			style={textInputStyle}
			{...props}
		/>
	);
};

export default TextInput;

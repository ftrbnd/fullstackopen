import { StyleSheet } from 'react-native';
import { useField } from 'formik';
import TextInput from './TextInput';
import Text from './Text';
import theme from '../utils/theme';

const styles = StyleSheet.create({
	errorText: {
		marginBottom: 5,
		color: theme.colors.error,
	},
	input: {
		padding: 8,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: 'grey',
		marginBottom: 8,
	},
});

const FormikTextInput = ({ name, placeholder, ...props }) => {
	const [field, meta, helpers] = useField(name);
	const showError = meta.touched && meta.error;

	return (
		<>
			<TextInput
				onChangeText={(value) => helpers.setValue(value)}
				onBlur={() => helpers.setTouched(true)}
				value={field.value}
				placeholder={placeholder}
				error={showError}
				style={styles.input}
				{...props}
			/>
			{showError && <Text style={styles.errorText}>{meta.error}</Text>}
		</>
	);
};

export default FormikTextInput;

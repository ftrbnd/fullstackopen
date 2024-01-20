import { StyleSheet } from 'react-native';
import { useField } from 'formik';
import TextInput from './TextInput';
import Text from './Text';

const styles = StyleSheet.create({
	errorText: {
		marginTop: 5,
	},
	input: {
		padding: 8,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: 'grey',
		marginBottom: 8,
	},
});

const FormikTextInput = ({ name, ...props }) => {
	const [field, meta, helpers] = useField(name);
	const showError = meta.touched && meta.error;

	return (
		<>
			<TextInput
				onChangeText={(value) => helpers.setValue(value)}
				onBlur={() => helpers.setTouched(true)}
				value={field.value}
				error={showError}
				style={styles.input}
				{...props}
			/>
			{showError && <Text style={styles.errorText}>{meta.error}</Text>}
		</>
	);
};

export default FormikTextInput;

import { View, Pressable, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { Formik } from 'formik';
import theme from '../utils/theme';
import * as yup from 'yup';

const initialValues = {
	username: '',
	password: '',
};

const validationSchema = yup.object().shape({
	username: yup.string().required('Username is required'),
	password: yup.string().required('Password is required'),
});

const styles = StyleSheet.create({
	form: {
		display: 'flex',
		padding: 8,
		alignItems: 'stretch',
	},
	button: {
		backgroundColor: theme.colors.primary,
		padding: 12,
		borderRadius: 5,
	},
	text: {
		color: 'white',
		alignSelf: 'center',
	},
});

const SignInForm = ({ onSubmit }) => {
	return (
		<View style={styles.form}>
			<FormikTextInput
				name={'username'}
				placeholder={'Username'}
			/>
			<FormikTextInput
				name={'password'}
				placeholder={'Password'}
				secureTextEntry
			/>
			<Pressable
				onPress={onSubmit}
				style={styles.button}>
				<Text
					style={styles.text}
					fontWeight={'bold'}>
					Sign In
				</Text>
			</Pressable>
		</View>
	);
};

const SignIn = () => {
	const onSubmit = (values) => {
		console.log(values);
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}>
			{({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
		</Formik>
	);
};

export default SignIn;

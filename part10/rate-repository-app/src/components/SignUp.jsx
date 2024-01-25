import { View, Pressable, StyleSheet } from 'react-native';
import FormikTextInput from '../components/FormikTextInput';
import Text from '../components/Text';
import { Formik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import useSignUp from '../hooks/useSignUp';
import theme from '../utils/theme';

const initialValues = {
	username: '',
	password: '',
	confirmPassword: '',
};

const validationSchema = yup.object().shape({
	username: yup.string().min(5).max(30).required('Username is required'),
	password: yup.string().min(5).max(50).required('Password is required'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null])
		.required('Password confirmation is required'),
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

const SignUpForm = ({ onSubmit }) => {
	return (
		<View style={styles.form}>
			<FormikTextInput
				name={'username'}
				placeholder={'Username'}
				autoCorrect={false}
				autoCapitalize={false}
			/>
			<FormikTextInput
				name={'password'}
				placeholder={'Password'}
				autoCorrect={false}
				autoCapitalize={false}
				secureTextEntry
			/>
			<FormikTextInput
				name={'confirmPassword'}
				placeholder={'Confirm password'}
				autoCorrect={false}
				autoCapitalize={false}
				secureTextEntry
			/>

			<Pressable
				onPress={onSubmit}
				style={styles.button}>
				<Text
					style={styles.text}
					fontWeight={'bold'}>
					Sign Up
				</Text>
			</Pressable>
		</View>
	);
};

export const SignUpContainer = ({ onSubmit }) => {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}>
			{({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
		</Formik>
	);
};

const SignUp = () => {
	const [signUp] = useSignUp();
	const [signIn] = useSignIn();
	const navigate = useNavigate();

	const onSubmit = async (values) => {
		const { username, password } = values;

		try {
			await signUp({ username, password });
			const signInData = await signIn({ username, password });

			if (signInData) navigate('/');
		} catch (e) {
			console.log(e);
		}
	};

	return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;

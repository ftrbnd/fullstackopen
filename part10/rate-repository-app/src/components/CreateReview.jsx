import { Pressable, StyleSheet, View } from 'react-native';
import * as yup from 'yup';
import theme from '../utils/theme';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import Text from './Text';
import useCreateReview from '../hooks/useCreateReview';
import { useNavigate } from 'react-router-native';

const initialValues = {
	ownerName: '',
	repositoryName: '',
	rating: 50,
	text: '',
};

const validationSchema = yup.object().shape({
	ownerName: yup.string().required('Repository owner is required'),
	repositoryName: yup.string().required('Repository name is required'),
	rating: yup.number().required('Rating is required').min(0).max(100).integer(),
	text: yup.string(),
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

const ReviewForm = ({ onSubmit }) => {
	return (
		<View style={styles.form}>
			<FormikTextInput
				name={'ownerName'}
				placeholder={'Repository Owner'}
				autoCorrect={false}
				autoCapitalize={false}
			/>
			<FormikTextInput
				name={'repositoryName'}
				placeholder={'Repository Name'}
				autoCorrect={false}
				autoCapitalize={false}
			/>
			<FormikTextInput
				name={'rating'}
				placeholder={'Rating (0 - 100)'}
				autoCorrect={false}
				autoCapitalize={false}
			/>
			<FormikTextInput
				name={'text'}
				placeholder={'Write your review'}
				autoCorrect={false}
				autoCapitalize={false}
				multiline={true}
			/>

			<Pressable
				onPress={onSubmit}
				style={styles.button}>
				<Text
					style={styles.text}
					fontWeight={'bold'}>
					Submit Review
				</Text>
			</Pressable>
		</View>
	);
};

export const ReviewContainer = ({ onSubmit }) => {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}>
			{({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
		</Formik>
	);
};

const CreateReview = () => {
	const [createReview] = useCreateReview();
	const navigate = useNavigate();

	const onSubmit = async (values) => {
		const { repositoryName, ownerName, rating, text } = values;

		try {
			const data = await createReview({
				repositoryName,
				ownerName,
				rating: parseInt(rating),
				text,
			});

			if (data) navigate(`/repositories/${data.createReview.repository.id}`);
		} catch (error) {
			console.log(error);
		}
	};

	return <ReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;

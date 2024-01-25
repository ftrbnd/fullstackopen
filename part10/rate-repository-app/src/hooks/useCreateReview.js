import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
	const [createReview, result] = useMutation(CREATE_REVIEW, {});

	const submitReview = async ({ ownerName, repositoryName, rating, text }) => {
		const { data } = await createReview({
			variables: { review: { ownerName, repositoryName, rating, text } },
		});

		return data;
	};

	return [submitReview, result];
};

export default useCreateReview;

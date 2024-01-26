import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';

const useCurrentUser = ({ includeReviews = false }) => {
	const { data } = useQuery(GET_CURRENT_USER, {
		fetchPolicy: 'cache-and-network',
		variables: {
			includeReviews,
		},
	});

	return {
		currentUser: data ? data.me : undefined,
	};
};

export default useCurrentUser;

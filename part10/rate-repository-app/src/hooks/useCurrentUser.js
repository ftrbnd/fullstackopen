import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';

const useCurrentUser = ({ includeReviews = false }) => {
	const { data, refetch } = useQuery(GET_CURRENT_USER, {
		fetchPolicy: 'cache-and-network',
		variables: {
			includeReviews,
		},
	});

	return {
		currentUser: data ? data.me : undefined,
		refetch,
	};
};

export default useCurrentUser;

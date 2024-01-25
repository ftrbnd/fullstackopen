import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy = 'CREATED_AT', orderDirection = 'DESC') => {
	const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
		fetchPolicy: 'cache-and-network',
		variables: {
			orderBy,
			orderDirection,
		},
	});

	return {
		repositories: data ? data.repositories : undefined,
		loading,
		refetch,
	};
};

export default useRepositories;

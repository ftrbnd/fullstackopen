import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({
	orderBy = 'CREATED_AT',
	orderDirection = 'DESC',
	searchKeyword,
	first,
}) => {
	const { data, loading, refetch, fetchMore } = useQuery(GET_REPOSITORIES, {
		fetchPolicy: 'cache-and-network',
		variables: {
			orderBy,
			orderDirection,
			searchKeyword,
			first,
		},
	});

	const handleFetchMore = () => {
		const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

		if (!canFetchMore) return;

		fetchMore({
			variables: {
				first,
				after: data.repositories.pageInfo.endCursor,
				orderBy,
				orderDirection,
				searchKeyword,
			},
		});
	};

	return {
		repositories: data ? data.repositories : undefined,
		loading,
		refetch,
		fetchMore: handleFetchMore,
	};
};

export default useRepositories;

import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS, REPOSITORY_PAGE } from './fragments';

export const GET_REPOSITORIES = gql`
	query Repositories(
		$orderBy: AllRepositoriesOrderBy
		$orderDirection: OrderDirection
	) {
		repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
			edges {
				node {
					...RepositoryDetails
				}
			}
		}
	}
	${REPOSITORY_DETAILS}
`;

// used when tapping on a single repository on the home page
export const GET_REPOSITORY = gql`
	query Repository($id: ID!) {
		repository(id: $id) {
			...RepositoryDetails
			...RepositoryPage
		}
	}
	${REPOSITORY_DETAILS}
	${REPOSITORY_PAGE}
`;

export const ME = gql`
	query Me {
		me {
			id
			username
		}
	}
`;

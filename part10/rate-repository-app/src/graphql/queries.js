import { gql } from '@apollo/client';
import {
	REPOSITORY_DETAILS,
	REPOSITORY_PAGE,
	REVIEW_DETAILS,
} from './fragments';

export const GET_REPOSITORIES = gql`
	query Repositories(
		$orderBy: AllRepositoriesOrderBy
		$orderDirection: OrderDirection
		$searchKeyword: String
	) {
		repositories(
			orderBy: $orderBy
			orderDirection: $orderDirection
			searchKeyword: $searchKeyword
		) {
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

export const GET_CURRENT_USER = gql`
	query getCurrentUser($includeReviews: Boolean = false) {
		me {
			id
			username
			reviews @include(if: $includeReviews) {
				edges {
					node {
						...ReviewDetails
					}
				}
			}
		}
	}
	${REVIEW_DETAILS}
`;

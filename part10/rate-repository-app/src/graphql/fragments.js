import { gql } from '@apollo/client';

export const REPOSITORY_DETAILS = gql`
	fragment RepositoryDetails on Repository {
		id
		ownerAvatarUrl
		fullName
		description
		language
		forksCount
		stargazersCount
		ratingAverage
		reviewCount
	}
`;

export const REPOSITORY_PAGE = gql`
	fragment RepositoryPage on Repository {
		url
		reviews(first: $first, after: $after) {
			edges {
				node {
					id
					text
					rating
					createdAt
					user {
						id
						username
					}
				}
				cursor
			}
			totalCount
			pageInfo {
				endCursor
				startCursor
				hasNextPage
			}
		}
	}
`;

export const REVIEW_DETAILS = gql`
	fragment ReviewDetails on Review {
		repository {
			id
			ownerName
			fullName
		}
		user {
			username
		}
		rating
		text
		createdAt
		id
	}
`;

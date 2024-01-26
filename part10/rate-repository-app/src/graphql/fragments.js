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
		reviews {
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
	}
`;

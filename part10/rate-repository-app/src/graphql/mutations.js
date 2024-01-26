import { gql } from '@apollo/client';
import { REVIEW_DETAILS } from './fragments';

export const AUTHENTICATE = gql`
	mutation Authenticate($username: String!, $password: String!) {
		authenticate(credentials: { username: $username, password: $password }) {
			accessToken
		}
	}
`;

export const CREATE_REVIEW = gql`
	mutation CreateReview($review: CreateReviewInput) {
		createReview(review: $review) {
			...ReviewDetails
		}
	}
	${REVIEW_DETAILS}
`;

export const CREATE_USER = gql`
	mutation CreateUser($user: CreateUserInput) {
		createUser(user: $user) {
			username
			id
		}
	}
`;

export const DELETE_REVIEW = gql`
	mutation DeleteReview($deleteReviewId: ID!) {
		deleteReview(id: $deleteReviewId)
	}
`;

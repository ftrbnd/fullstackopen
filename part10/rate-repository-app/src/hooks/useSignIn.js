import { useApolloClient, useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
	const [authenticate, result] = useMutation(AUTHENTICATE);
	const authStorage = useAuthStorage();
	const apolloClient = useApolloClient();

	const signIn = async ({ username, password }) => {
		const { data } = await authenticate({ variables: { username, password } });

		if (data) {
			await authStorage.setAccessToken(data.authenticate.accessToken);
			await apolloClient.resetStore();
		}

		return data;
	};

	return [signIn, result];
};

export default useSignIn;

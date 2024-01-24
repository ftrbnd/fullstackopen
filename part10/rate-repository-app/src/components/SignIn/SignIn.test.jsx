import {
	render,
	screen,
	fireEvent,
	waitFor,
} from '@testing-library/react-native';
import { SignInContainer } from '.';

describe('SignIn', () => {
	describe('SignInContainer', () => {
		it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
			const onSubmit = jest.fn();
			render(<SignInContainer onSubmit={onSubmit} />);

			fireEvent.changeText(screen.getByPlaceholderText('Username'), 'giosalad');
			fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
			fireEvent.press(screen.getByText('Sign In'));

			await waitFor(() => {
				expect(onSubmit.mock.calls[0][0]).toEqual({
					username: 'giosalad',
					password: 'password',
				});
			});
		});
	});
});

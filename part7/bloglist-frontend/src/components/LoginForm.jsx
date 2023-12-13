import { useDispatch } from 'react-redux';
import { displayNotification } from '../reducers/notificationReducer';
import { logInUser } from '../reducers/userReducer';

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    const user = {
      username: event.target.username.value,
      password: event.target.password.value
    };

    event.target.username.value = '';
    event.target.password.value = '';

    try {
      dispatch(logInUser(user));
      dispatch(displayNotification(`Welcome ${user.username}!`));
    } catch (e) {
      dispatch(displayNotification('Invalid credentials'));
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Username
        <input id="username" name="username" placeholder="Username" />
      </label>
      <label>
        Password
        <input id="password" name="password" placeholder="Password" />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;

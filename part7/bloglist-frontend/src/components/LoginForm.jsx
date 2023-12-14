import { useDispatch } from 'react-redux';
import { displayNotification } from '../reducers/notificationReducer';
import { logInUser } from '../reducers/userReducer';
import { TextField, Button, Typography } from '@mui/material';

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
      <TextField label="username" name="username" id="username" placeholder="Username" />
      <TextField label="password" name="password" id="password" placeholder="Password" type="password" />
      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;

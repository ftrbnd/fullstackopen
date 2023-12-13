import { useEffect } from 'react';
import './styles.css';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import { useDispatch, useSelector } from 'react-redux';
import BlogList from './components/BlogList';
import { initializeUser, logOutUser } from './reducers/userReducer';
import LoginForm from './components/LoginForm';

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();

    dispatch(logOutUser());
  };

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />

      {user ? (
        <div className="blogs">
          <p>{user.username} logged in</p>
          <BlogList />
          <button onClick={handleLogout} id="logout">
            Logout
          </button>

          <Togglable buttonLabel="New Blog">
            <BlogForm />
          </Togglable>
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default App;

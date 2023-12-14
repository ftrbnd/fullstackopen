import { useEffect } from 'react';
import './styles.css';
import Notification from './components/Notification';
import { useDispatch, useSelector } from 'react-redux';
import BlogList from './components/BlogList';
import { initializeUser, logOutUser } from './reducers/userReducer';
import LoginForm from './components/LoginForm';
import { Link, Route, Routes, useMatch } from 'react-router-dom';
import UserList from './components/UserList';
import User from './components/User';
import BlogDetail from './components/BlogDetail';
import { initializeBlogs } from './reducers/blogsReducer';
import { getUsers } from './reducers/usersReducer';
import { Container, AppBar, Toolbar, IconButton, Button, Typography } from '@mui/material';

const Menu = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = (event) => {
    event.preventDefault();

    dispatch(logOutUser());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" />
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/blogs">
          Blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          Users
        </Button>
        {user && (
          <>
            <Typography>{user.username} logged in</Typography>
            <Button color="inherit" onClick={handleLogout} id="logout">
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);
  const userMatch = useMatch('/users/:id');
  const currentUser = userMatch ? users.find((u) => u.id === userMatch.params.id) : null;

  const blogs = useSelector((state) => state.blogs);
  const blogMatch = useMatch('/blogs/:id');
  const currentBlog = blogMatch ? blogs.find((b) => b.id === blogMatch.params.id) : null;

  useEffect(() => {
    dispatch(initializeUser());
    dispatch(initializeBlogs());
    dispatch(getUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Menu />
      <Typography variant="h1">Blogs</Typography>
      <Notification />

      {user ? (
        <Routes>
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<User user={currentUser} />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/:id" element={<BlogDetail blog={currentBlog} />} />
          <Route path="/" element={<BlogList />} />
        </Routes>
      ) : (
        <LoginForm />
      )}
    </Container>
  );
};

export default App;

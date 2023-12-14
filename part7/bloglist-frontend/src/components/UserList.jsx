import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUsers } from '../reducers/usersReducer';
import { useNavigate } from 'react-router-dom';
import { Typography, TableContainer, Paper, Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material';

const UserRow = ({ user }) => {
  const navigate = useNavigate();

  return (
    <TableRow onClick={() => navigate(`/users/${user.id}`)}>
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.blogs.length}</TableCell>
    </TableRow>
  );
};

const UserList = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Typography variant="h4">Users</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserList;

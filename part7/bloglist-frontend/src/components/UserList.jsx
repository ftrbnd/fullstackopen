import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUsers } from '../reducers/usersReducer';
import { useNavigate } from 'react-router-dom';

const UserRow = ({ user }) => {
  const navigate = useNavigate();

  return (
    <tr onClick={() => navigate(`/users/${user.id}`)}>
      <td>{user.username}</td>
      <td>{user.blogs.length}</td>
    </tr>
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
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Blogs Created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserRow key={user.id} user={user} />
        ))}
      </tbody>
    </table>
  );
};

export default UserList;

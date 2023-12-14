import { Typography, List, ListItem } from '@mui/material';

const User = ({ user }) => {
  if (!user) return null;

  return (
    <div>
      <Typography variant="h6">{user.username}</Typography>
      <Typography variant="subtitle2">Added blogs:</Typography>
      {user.blogs.length > 0 ? (
        <List>
          {user.blogs.map((blog) => (
            <ListItem key={blog.id}>{blog.title}</ListItem>
          ))}
        </List>
      ) : (
        <Typography>No blogs to show.</Typography>
      )}
    </div>
  );
};

export default User;

import { useDispatch, useSelector } from 'react-redux';
import { commentOnBlog, deleteThisBlog, likeBlog } from '../reducers/blogsReducer';
import { displayNotification } from '../reducers/notificationReducer';
import { Typography, Button, TextField, List, ListItem } from '@mui/material';

const BlogDetail = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLike = async () => {
    try {
      dispatch(likeBlog(blog));
    } catch (exception) {
      dispatch(displayNotification('Failed to like blog...'));
      console.error(exception);
    }
  };

  const handleDelete = async () => {
    try {
      const confirm = window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`);

      if (confirm) {
        dispatch(deleteThisBlog(blog));
      }
    } catch (exception) {
      dispatch(displayNotification('Failed to delete blog...'));
      console.error(exception);
    }
  };

  const handleComment = async (event) => {
    event.preventDefault();

    const comment = event.target.comment.value;
    if (!comment) return;

    event.target.comment.value = '';

    try {
      dispatch(commentOnBlog(blog, comment));
    } catch (err) {
      dispatch(displayNotification('Failed to add comment'));
      console.error(err);
    }
  };

  if (!blog) return <p>Blog not found.</p>;

  return (
    <div>
      <Typography variant="h2">{blog.title}</Typography>
      <Typography variant="subtitle1">{blog.url}</Typography>
      <Typography variant="subtitle2" className="likes">
        Likes: {blog.likes} <Button onClick={handleLike}>Like</Button>
      </Typography>
      <Typography variant="subtitle2"> Submitted by: {blog.user ? blog.user.username : 'Unknown user'}</Typography>
      {blog.user.username === user.username && (
        <Button onClick={handleDelete} id="delete-blog" variant="contained" color="error">
          Delete
        </Button>
      )}

      <h3>Comments</h3>
      {blog.comments ? (
        <List>
          {blog.comments.map((comment) => (
            <ListItem key={comment}>{comment}</ListItem>
          ))}
        </List>
      ) : (
        <p>No comments for this blog.</p>
      )}
      <form onSubmit={handleComment}>
        <TextField name="comment" id="comment" placeholder="Comment" />
        <Button type="submit" variant="contained">
          Add Comment
        </Button>
      </form>
    </div>
  );
};

export default BlogDetail;

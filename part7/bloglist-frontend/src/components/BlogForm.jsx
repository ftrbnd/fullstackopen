import { useDispatch } from 'react-redux';
import { displayNotification } from '../reducers/notificationReducer';
import { createNewBlog } from '../reducers/blogsReducer';
import { TextField, Button, Typography } from '@mui/material';

const BlogForm = () => {
  const dispatch = useDispatch();

  const addBlog = async (event) => {
    event.preventDefault();

    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    };

    event.target.title.value = '';
    event.target.author.value = '';
    event.target.url.value = '';

    try {
      dispatch(createNewBlog(newBlog));
      dispatch(displayNotification(`Created new blog: "${newBlog.title}"`));
    } catch (e) {
      dispatch(displayNotification('Failed to create blog'));
      console.error(e);
    }
  };

  return (
    <form onSubmit={addBlog}>
      <Typography variant="h3">New Blog</Typography>

      <div>
        <TextField label="title" name="title" id="title" placeholder="Title" />
      </div>
      <div>
        <TextField label="author" name="author" id="author" placeholder="Author" />
      </div>
      <div>
        <TextField label="url" name="url" id="url" placeholder="Url" />
      </div>
      <Button type="submit" variant="contained">
        Create
      </Button>
    </form>
  );
};

export default BlogForm;

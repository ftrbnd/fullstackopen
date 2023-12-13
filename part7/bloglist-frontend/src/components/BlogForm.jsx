import { useDispatch } from 'react-redux';
import { displayNotification } from '../reducers/notificationReducer';
import { createNewBlog } from '../reducers/blogsReducer';

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
      <h2>New Blog</h2>

      <label>
        Title
        <input id="title" name="title" placeholder="Title" />
      </label>
      <label>
        Author
        <input id="author" name="author" placeholder="Author" />
      </label>
      <label>
        Url
        <input id="url" name="url" placeholder="Url" />
      </label>
      <button type="submit">Create</button>
    </form>
  );
};

export default BlogForm;

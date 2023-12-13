import { useDispatch, useSelector } from 'react-redux';
import { commentOnBlog, deleteThisBlog, likeBlog } from '../reducers/blogsReducer';
import { displayNotification } from '../reducers/notificationReducer';

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
      <h2>{blog.title}</h2>
      <p>{blog.url}</p>
      <div className="likes">
        Likes: {blog.likes} <button onClick={handleLike}>Like</button>
      </div>
      <div>{blog.user ? blog.user.username : 'Unknown user'}</div>
      {blog.user.username === user.username && (
        <button onClick={handleDelete} id="delete-blog">
          Delete
        </button>
      )}

      <h3>Comments</h3>
      {blog.comments ? (
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      ) : (
        <p>No comments for this blog.</p>
      )}
      <form onSubmit={handleComment}>
        <input name="comment" id="comment" placeholder="Comment" />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default BlogDetail;

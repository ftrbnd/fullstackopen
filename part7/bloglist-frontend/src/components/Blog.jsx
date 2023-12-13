import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteThisBlog, likeBlog } from '../reducers/blogsReducer';
import { displayNotification } from '../reducers/notificationReducer';

const Blog = ({ blog }) => {
  const [showBlog, setShowBlog] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

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

  return blog ? (
    <div style={blogStyle} data-testid="blog" className="blog">
      {blog.title} - {blog.author}
      <button onClick={() => setShowBlog((prev) => !prev)}>{showBlog ? 'Hide' : 'View'}</button>
      {showBlog && (
        <div className="blogdetails">
          <div>{blog.url}</div>
          <div className="likes">
            Likes: {blog.likes} <button onClick={handleLike}>Like</button>
          </div>
          <div>{blog.user ? blog.user.username : 'Unknown user'}</div>
          {blog.user.username === user.username && (
            <button onClick={handleDelete} id="delete-blog">
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  ) : (
    <div>Deleted</div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired
};

export default Blog;

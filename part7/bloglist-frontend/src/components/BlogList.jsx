import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Blog from './Blog';
import { initializeBlogs } from '../reducers/blogsReducer';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ul>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </ul>
      <Togglable buttonLabel="New Blog">
        <BlogForm />
      </Togglable>
    </>
  );
};

export default BlogList;

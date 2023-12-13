import { useSelector } from 'react-redux';
import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

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

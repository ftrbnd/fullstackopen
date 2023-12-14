import { useSelector } from 'react-redux';
import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';
import { TableContainer, Paper, Table, TableBody } from '@mui/material';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div className="blogs">
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Togglable buttonLabel="New Blog">
        <BlogForm />
      </Togglable>
    </div>
  );
};

export default BlogList;

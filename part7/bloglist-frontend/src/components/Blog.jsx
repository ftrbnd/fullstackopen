import { Link } from 'react-router-dom';
import { TableRow, TableCell } from '@mui/material';

const Blog = ({ blog }) => {
  return blog ? (
    <TableRow data-testid="blog" className="blog">
      <TableCell>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </TableCell>
      <TableCell>{blog.author}</TableCell>
    </TableRow>
  ) : (
    <div>Deleted</div>
  );
};

export default Blog;

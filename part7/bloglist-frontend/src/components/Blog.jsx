import { useNavigate } from 'react-router-dom';

const Blog = ({ blog }) => {
  const navigate = useNavigate();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  return blog ? (
    <div onClick={() => navigate(`/blogs/${blog.id}`)} style={blogStyle} data-testid="blog" className="blog">
      {blog.title} - {blog.author}
    </div>
  ) : (
    <div>Deleted</div>
  );
};

export default Blog;

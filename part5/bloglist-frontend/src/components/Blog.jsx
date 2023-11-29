const Blog = ({ blog }) => {
  return (<div>
    {blog.title} {blog.author ? blog.author.username : 'unknown author'}
  </div>)
}

export default Blog
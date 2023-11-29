import { useState } from 'react'

const Blog = ({ blog }) => {
  const [showBlog, setShowBlog] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author ? blog.author.username : 'unknown author'}
      <button onClick={() => setShowBlog(prev => !prev)}>
        {showBlog ? 'Hide' : 'View'}
      </button>
      {showBlog &&
        <div>
          <div>{blog.url}</div>
          <div>{blog.likes} <button>Like</button></div>
          <div>{blog.author ? blog.author.username : 'unknown author'}</div>
        </div>
      }
    </div>
  )
}

export default Blog
import { useState } from 'react'
import { deleteBlog, updateBlog } from '../services/blogs'

const Blog = ({ blog, user }) => {
  const [showBlog, setShowBlog] = useState(false)
  const [currentBlog, setCurrentBlog] = useState(blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    try {
      const newBlog = await updateBlog({
        ...currentBlog,
        likes: currentBlog.likes + 1
      })

      setCurrentBlog(newBlog)
    } catch (exception) {
      console.error(exception)
    }
  }

  const handleDelete = async () => {
    try {
      const confirm = window.confirm(`Remove blog "${currentBlog.title}" by ${currentBlog.author}?`)

      if (confirm) {
        await deleteBlog(currentBlog)
        setCurrentBlog(null)
      }
    } catch (exception) {
      console.error(exception)
    }
  }

  return (
    <div style={blogStyle}>
      {currentBlog.title} - {currentBlog.author}
      <button onClick={() => setShowBlog(prev => !prev)}>
        {showBlog ? 'Hide' : 'View'}
      </button>
      {showBlog &&
        <div>
          <div>{currentBlog.url}</div>
          <div>{currentBlog.likes} <button onClick={handleLike}>Like</button></div>
          <div>{currentBlog.user ? currentBlog.user.username : 'Unknown user'}</div>
          {blog.user.username === user.username && <button onClick={handleDelete}>Delete</button>}
        </div>
      }
    </div>
  )
}

export default Blog
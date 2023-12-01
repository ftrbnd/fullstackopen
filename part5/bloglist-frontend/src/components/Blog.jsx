import { useState } from 'react'
import { deleteBlog, updateBlog } from '../services/blogs'
import PropTypes from 'prop-types'

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
        ...blog,
        likes: blog.likes + 1
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

  return currentBlog ?
    <div style={blogStyle} data-testid="blog" className='blog'>
      {currentBlog.title} - {currentBlog.author}
      <button onClick={() => setShowBlog(prev => !prev)}>
        {showBlog ? 'Hide' : 'View'}
      </button>
      {showBlog &&
        <div className="blogdetails">
          <div>{currentBlog.url}</div>
          <div className='likes'>Likes: {currentBlog.likes} <button onClick={handleLike}>Like</button></div>
          <div>{currentBlog.user ? currentBlog.user.username : 'Unknown user'}</div>
          {currentBlog.user.username === user.username && <button onClick={handleDelete} id='delete-blog'>Delete</button>}
        </div>
      }
    </div >
    : <div>Deleted</div>
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { createBlog, getAllBlogs, setToken } from './services/blogs'
import { login } from './services/login'
import './styles.css'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null) // has username, token
  const [notification, setNotification] = useState('')
  const [notificationType, setNotificationType] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    async function getBlogs() {
      const blogs = await getAllBlogs()
      setBlogs(blogs)
    }

    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('bloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await login({ username, password })
      setToken(user.token)

      window.localStorage.setItem(
        'bloglistUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('Invalid credentials')
      setNotificationType('error')
      console.error(exception)

      setTimeout(() => {
        setNotification('')
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('bloglistUser')
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = await createBlog({
        title,
        author,
        url
      })

      setBlogs(blogs.concat(newBlog))

      setNotification('Blog created')
      setNotificationType('success')
      setTitle('')
      setAuthor('')
      setUrl('')

      setTimeout(() => {
        setNotification('')
      }, 5000)

    } catch (exception) {
      setNotification('Invalid blog')
      setNotificationType('error')
      console.error(exception)

      setTimeout(() => {
        setNotification('')
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          className='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          className='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id='login-button'>Login</button>
    </form>
  )

  return (
    <div>
      <h2>Blogs</h2>
      {notification && <div className={`${notificationType}`}>{ notification }</div>}

      {user
        ? (
          <div className='blogs'>
            <p>{user.username} logged in</p>
            {blogs.sort((a, b) => { return b.likes - a.likes }).map(blog =>
              <Blog key={blog.id} blog={blog} user={user} />
            )}
            <button onClick={handleLogout}>Logout</button>

            <Togglable buttonLabel="New Blog">
              <BlogForm
                addBlog={addBlog}
                title={title}
                setTitle={setTitle}
                author={author}
                setAuthor={setAuthor}
                url={url}
                setUrl={setUrl}
              />
            </Togglable>
          </div>
        )
        : loginForm()
      }
    </div>
  )
}

export default App
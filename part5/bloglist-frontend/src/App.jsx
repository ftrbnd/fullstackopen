import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { getAllBlogs, setToken } from './services/blogs'
import { login } from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null) // has username, token
  
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 

  useEffect(() => {
    async function getBlogs() {
      const blogs = await getAllBlogs()
      setBlogs(blogs)
    }

    getBlogs()
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await login({ username, password })
      setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error(exception);
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>      
  )

  return (
    <div>
      <h2>Blogs</h2>

      {user
        ? (
          <div>
            <p>{user.username} logged in</p>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
        )
        : loginForm()
      }
    </div>
  )
}

export default App
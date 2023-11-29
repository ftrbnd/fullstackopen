import PropTypes from 'prop-types'

const BlogForm = ({ addBlog, title, setTitle, author, setAuthor, url, setUrl }) => {
  return <form onSubmit={addBlog}>
    <h2>New Blog</h2>

    <label>
        Title
      <input
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
    </label>
    <label>
        Author
      <input
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
    </label>
    <label>
        Url
      <input
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
    </label>
    <button type="submit">Create</button>
  </form>
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  setAuthor: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  setUrl: PropTypes.func.isRequired
}

export default BlogForm
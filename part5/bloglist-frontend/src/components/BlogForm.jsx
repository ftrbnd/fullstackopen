import { useState } from "react"

const BlogForm = ({ addBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    
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

export default BlogForm
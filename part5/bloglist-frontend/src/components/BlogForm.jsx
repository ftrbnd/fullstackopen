import { useState } from "react"

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

export default BlogForm
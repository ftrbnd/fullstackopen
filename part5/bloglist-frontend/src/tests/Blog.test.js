import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'
import userEvent from '@testing-library/user-event'
import BlogForm from '../components/BlogForm'

describe('renders a blog', () => {
  let blog = null
  let user = null

  beforeAll(() => {
    user = {
      username: 'Test username'
    }

    blog = {
      title: 'Blog title',
      author: 'Blog author',
      url: 'https://blog.com',
      likes: 5,
      user
    }
  })

  test('with its title and author and excludes its url and likes', () => {
    const { container } = render(<Blog blog={blog} user={user}/>)

    const element = screen.getByTestId('blog')
    expect(element).toHaveTextContent('Blog title')
    expect(element).toHaveTextContent('Blog author')

    const details = container.querySelector('blogdetails')
    expect(details).toBeNull()
  })

  test('with its url and likes when the view button is clicked', async () => {
    const userAgent = userEvent.setup()
    const { container } = render(<Blog blog={blog} user={user}/>)

    const button = screen.getByText('View')
    await userAgent.click(button)

    const details = container.querySelector('blogdetails')
    expect(details).toBeDefined()
  })

  test('calls the like button event handler', async () => {
    const mockHandler = jest.fn()

    const userAgent = userEvent.setup()
    render(<Blog blog={blog} user={user} handleLike={mockHandler}/>)

    const viewDetailsButton = screen.getByText('View')
    await userAgent.click(viewDetailsButton)

    const likeButton = screen.getByText('Like')
    await userAgent.click(likeButton)
    await userAgent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test('calls the new-blog form event handler', async () => {
    const mockHandler = jest.fn()
    const mockAuthor = jest.fn()
    const mockTitle = jest.fn()
    const mockUrl = jest.fn()

    const userAgent = userEvent.setup()
    render(<BlogForm
      addBlog={mockHandler}
      author=''
      setAuthor={mockAuthor}
      title=''
      setTitle={mockTitle}
      url=''
      setUrl={mockUrl}
    />)

    const title = screen.getByPlaceholderText('Title')
    const author = screen.getByPlaceholderText('Author')
    const url = screen.getByPlaceholderText('Url')
    const submitButton = screen.getByText('Create')

    await userAgent.type(title, 'Test title')
    await userAgent.type(author, 'Test author')
    await userAgent.type(url, 'https://test.com')

    await userAgent.click(submitButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
  })
})
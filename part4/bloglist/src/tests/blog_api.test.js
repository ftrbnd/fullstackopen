const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const { initialBlogs, blogsInDb } = require('../utils/blog_helper')
const Blog = require('../models/Blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json and have expected length', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('blog posts have an id property', async () => {
  const response = await api
    .get(`/api/blogs/${initialBlogs[0]._id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.id).toBeDefined()
})

describe('creating a new blog post', () => {
  test('with all valid fields', async () => {
    const newBlog = {
      title: 'New blog',
      author: 'New author',
      url: 'New url',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const notesAtEnd = await blogsInDb()
    expect(notesAtEnd)
      .toHaveLength(initialBlogs.length + 1)
  })

  test('without likes property', async () => {
    const newBlog = {
      title: 'New blog',
      author: 'New author',
      url: 'New url',
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('without a title or url', async () => {
    const newBlog = {
      author: 'New author',
      url: 'New url',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  }, 100000)
})

describe('updating a blog', () => {
  test('succeeds with status code 200 when updating likes', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ ...blogToUpdate, likes: 100 })
      .expect(200)

    const blogsAtEnd = await blogsInDb()

    expect(blogsAtEnd[0].likes).toBe(100)
  })
})

afterAll(() => {
  mongoose.connection.close()
})

// TODO: currently at around 4 hours for part 4 at 9:30pm on 9/22/21
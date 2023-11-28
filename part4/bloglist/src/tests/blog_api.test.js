const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const { initialBlogs, blogsInDb } = require('../utils/blog_helper')
const Blog = require('../models/Blog')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

describe('general tests', () => {
  test('blogs are returned as json and have expected length', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(initialBlogs.length)
  }, 100000)

  test('blog posts have an id property', async () => {
    const response = await api
      .get(`/api/blogs/${initialBlogs[0]._id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.id).toBeDefined()
  })
})

describe('actions that require auth', () => {
  let testUser = null
  let testToken = ''

  beforeAll(async () => {
    await User.deleteOne({ username: 'testuser' })

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'testuser', passwordHash })

    testUser = await user.save()

    const loginResponse = await api
      .post('/api/login')
      .send({
        username: user.username,
        password: 'sekret'
      })
      .expect(200)

    testToken = loginResponse.body.token
  })

  describe('creating a new blog post', () => {
    test('with all valid fields', async () => {
      const newBlog = {
        title: 'New blog',
        author: testUser,
        url: 'New url',
        likes: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${testToken}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const notesAtEnd = await blogsInDb()
      expect(notesAtEnd)
        .toHaveLength(initialBlogs.length + 1)
    })

    test('without likes property', async () => {
      const newBlog = {
        title: 'New blog',
        author: testUser,
        url: 'New url',
      }

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${testToken}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      expect(response.body.likes).toBe(0)
    })

    test('without a title or url', async () => {
      const newBlog = {
        author: testUser,
        url: 'New url',
        likes: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${testToken}`)
        .expect(400)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogToDelete = new Blog({
        author: testUser,
        likes: 0,
        title: 'Blog to Delete',
        url: 'https://example.com'
      })
      await blogToDelete.save()

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${testToken}`)
        .expect(204)

      const blogsAtEnd = await blogsInDb()

      expect(blogsAtEnd).toHaveLength(
        initialBlogs.length // expected to be the same length because we are creating and deleting the same blog
      )

      const titles = blogsAtEnd.map(r => r.title)

      expect(titles).not.toContain(blogToDelete.title)
    }, 100000)
  })

  describe('updating a blog', () => {
    test('succeeds with status code 200 when updating likes', async () => {
      const blogToUpdate = new Blog({
        author: testUser,
        likes: 3,
        title: 'Blog to Update',
        url: 'https://example2.com'
      })

      await blogToUpdate.save()
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send({ ...blogToUpdate, likes: 100 })
        .set('Authorization', `Bearer ${testToken}`)
        .expect(200)

      const updatedBlog = await Blog.findById(blogToUpdate.id)

      expect(updatedBlog.likes).toBe(100)
    })
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})



// TODO: currently at around 7.5 hours
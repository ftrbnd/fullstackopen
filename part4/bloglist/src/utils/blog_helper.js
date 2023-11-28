const Blog = require('../models/Blog')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: {
      name: 'Michael Chan',
      username: 'michaelchan',
      _id: '5a422a851b54a676234d17f6'
    },
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: {
      name: 'Edsger W. Dijkstra',
      username: 'edsgerdijkstra',
      _id: '5a422aa71b54a676234d17f7'
    },
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: {
      name: 'Edsger W. Dijkstra',
      username: 'edsgerdijkstra',
      _id: '5a422aa71b54a676234d17f7'
    },
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: {
      name: 'Robert C. Martin',
      username: 'robertmartin',
      _id: '5a422b891b54a676234d17f9'
    },
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: {
      name: 'Robert C. Martin',
      username: 'robertmartin',
      _id: '5a422b891b54a676234d17f9'
    },
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: {
      name: 'Robert C. Martin',
      username: 'robertmartin',
      _id: '5a422b891b54a676234d17f9'
    },
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Nonexistent title',
    author: {
      name: 'Fake author',
      username: 'fakeauthor',
      _id: '5a422b891b54a672234d17f9'
    },
    url: 'Nonexistent url',
    likes: 0
  })

  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}
const { totalLikes, favoriteBlog } = require('../utils/list_helper')
const { initialBlogs } = require('../utils/blog_helper')

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = totalLikes([initialBlogs[0]])
    expect(result).toBe(7)
  })

  test('of a bigger list is calculated right', () => {
    const result = totalLikes(initialBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('returns null when list is empty', () => {
    const result = favoriteBlog([])
    expect(result).toBe(null)
  })

  test('is the only blog when list has only one blog', () => {
    const result = favoriteBlog([initialBlogs[0]])
    expect(result).toEqual({
      title: initialBlogs[0].title,
      author: initialBlogs[0].author,
      likes: initialBlogs[0].likes
    })
  })

  test('is the blog with the most likes', () => {
    const result = favoriteBlog(initialBlogs)
    expect(result).toEqual({
      title: initialBlogs[2].title,
      author: initialBlogs[2].author,
      likes: initialBlogs[2].likes
    })
  })
})
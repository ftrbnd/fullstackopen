const totalLikes = (blogs) => {
  if (blogs.length === 0)
    return 0
  else if (blogs.length === 1)
    return blogs[0].likes
  else {
    const reducer = (sum, item) => {
      return sum + item.likes
    }

    return blogs.reduce(reducer, 0)
  }
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0)
    return null
  else if (blogs.length === 1)
    return {
      title: blogs[0].title,
      author: blogs[0].author,
      likes: blogs[0].likes
    }
  else {
    const reducer = (favorite, item) => {
      return favorite.likes > item.likes ? favorite : item
    }

    const favorite = blogs.reduce(reducer, blogs[0])
    return {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes
    }
  }
}

module.exports = {
  totalLikes,
  favoriteBlog,
}
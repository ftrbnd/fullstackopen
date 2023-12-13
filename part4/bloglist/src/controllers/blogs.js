const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
	response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id).populate('user', {
		username: 1,
		name: 1,
	});

	if (blog) {
		response.json(blog);
	} else {
		response.status(404).end();
	}
});

blogsRouter.post('/', userExtractor, async (request, response) => {
	const body = request.body;

	if (!body.title || !body.url) {
		return response.status(400).json({ error: 'Missing title or url' });
	}

	const user = request.user;

	if (!user) {
		return response.status(401).json({ error: 'Not an authorized user' });
	}

	const blog = new Blog({
		title: body.title,
		author: body.author,
		user: user,
		url: body.url,
		likes: body.likes ?? 0,
	});

	const savedBlog = await blog.save();

	user.blogs = user.blogs.concat(savedBlog._id);
	user.save();

	response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
	const blogToDelete = await Blog.findById(request.params.id);

	const user = request.user;

	if (!user) {
		return response.status(401).json({ error: 'Not an authorized user' });
	}

	if (blogToDelete.user.toString() !== user.id) {
		return response.status(401).json({ error: 'Unauthorized user' });
	}

	await Blog.findByIdAndDelete(request.params.id);
	response.status(204).end();
});

blogsRouter.put('/:id', userExtractor, async (request, response) => {
	const body = request.body;

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
	};

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
		new: true,
	}).populate('user', { username: 1, name: 1 });
	response.json(updatedBlog);
});

blogsRouter.post('/:id/comments', async (request, response) => {
	const comment = request.body.text;

	if (!comment) {
		return response.status(400).json({ error: 'Missing text for comment' });
	}

	const blog = await Blog.findById(request.params.id);

	blog.comments.push(comment);
	await blog.save();

	response.status(201).json(blog);
});

module.exports = blogsRouter;

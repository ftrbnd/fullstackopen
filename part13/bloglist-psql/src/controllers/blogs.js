const router = require('express').Router();
const { Blog, User } = require('../models');
const { blogFinder, tokenExtractor } = require('../utils/middleware');

router.get('/', async (_req, res) => {
	const blogs = await Blog.findAll();
	res.json(blogs);
});

router.post('/', tokenExtractor, async (req, res) => {
	const user = await User.findByPk(req.decodedToken.id);
	const blog = await Blog.create({
		...req.body,
		userId: user.id,
		date: new Date(),
	});
	res.json(blog);
});

router.delete('/:id', blogFinder, async (req, res) => {
	await req.blog.destroy();
	res.status(204).end();
});

router.put('/:id', blogFinder, async (req, res) => {
	req.blog.likes = req.body.likes;
	await req.blog.save();
	res.json(req.blog);
});

module.exports = {
	blogsRouter: router,
};

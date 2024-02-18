const express = require('express');
const { Blog } = require('../models/Blog');
const blogsRouter = express.Router();

blogsRouter.get('/', async (_req, res) => {
	try {
		const blogs = await Blog.findAll();
		res.json(blogs);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

blogsRouter.post('/', async (req, res) => {
	try {
		const blog = await Blog.create(req.body);
		res.json(blog);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

blogsRouter.delete('/:id', async (req, res) => {
	try {
		await Blog.destroy({
			where: {
				id: req.params.id,
			},
		});
		res.sendStatus(204);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = {
	blogsRouter,
};

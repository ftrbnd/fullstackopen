const router = require('express').Router();
const { Op } = require('sequelize');
const { Blog, User } = require('../models');
const { blogFinder, tokenExtractor } = require('../utils/middleware');

router.get('/', async (req, res) => {
	let where = {};

	if (req.query.search) {
		where = {
			[Op.or]: [
				{
					title: {
						[Op.iLike]: `%${req.query.search}%`,
					},
				},
				{
					author: {
						[Op.iLike]: `%${req.query.search}%`,
					},
				},
			],
		};
	}

	const blogs = await Blog.findAll({
		include: {
			model: User,
			attributes: ['name'],
		},
		where,
		order: [['likes', 'DESC']],
	});
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

router.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {
	if (req.blog.userId !== req.decodedToken.id) {
		throw Error('Invalid user');
	}

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

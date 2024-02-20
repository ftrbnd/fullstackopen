const { Blog } = require('../models');
const { sequelize } = require('../utils/db');

const router = require('express').Router();

router.get('/', async (_req, res) => {
	const blogs = await Blog.findAll({
		attributes: [
			'author',
			[sequelize.fn('COUNT', sequelize.col('author')), 'articles'],
			[sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
		],
		group: 'author',
		order: [['likes', 'DESC']],
	});

	res.json(blogs);
});

module.exports = {
	authorsRouter: router,
};

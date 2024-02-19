const { Blog, User } = require('../models');

const blogFinder = async (req, _res, next) => {
	req.blog = await Blog.findByPk(req.params.id);
	if (!req.blog) throw Error('Blog not found');

	next();
};

const userFinder = async (req, _res, next) => {
	req.user = await User.findByPk(req.params.username);
	if (!req.user) throw Error('User not found');

	next();
};

const errorHandler = (error, _request, response, _next) => {
	console.log(error.message);

	if (error.message === 'Blog not found') {
		return response.status(404).json({ error: 'Blot not found' });
	}

	return response.status(400).json({ error: error.message });
};
module.exports = {
	blogFinder,
	userFinder,
	errorHandler,
};

const jwt = require('jsonwebtoken');
const { Blog, User } = require('../models');
const { SECRET } = require('./config');

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

const tokenExtractor = (req, res, next) => {
	const authorization = req.get('authorization');
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		try {
			req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
		} catch {
			return res.status(401).json({ error: 'Invalid token' });
		}
	} else {
		throw Error('Token missing');
	}
	next();
};

const errorHandler = (error, _request, response, _next) => {
	console.log(error.message);

	if (error.message === 'Blog not found') {
		return response.status(404).json({ error: 'Blog not found' });
	} else if (error.message.includes('on year failed')) {
		return response.status(400).json({
			error: `Year must be between 1991 - ${new Date().getUTCFullYear()}`,
		});
	}

	return response.status(400).json({ error: error.message });
};
module.exports = {
	blogFinder,
	userFinder,
	tokenExtractor,
	errorHandler,
};

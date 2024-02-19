const jwt = require('jsonwebtoken');
const router = require('express').Router();
const { User } = require('../models/User');
const { SECRET } = require('../utils/config');

router.post('/', async (request, response) => {
	const body = request.body;

	const user = await User.findOne({
		where: {
			username: body.username,
		},
	});

	const passwordCorrect = body.password === 'asdf';

	if (!(user && passwordCorrect)) {
		return response.status(401).json({
			error: 'Invalid username or password',
		});
	}

	const userForToken = {
		username: user.username,
		id: user.id,
	};

	const token = jwt.sign(userForToken, SECRET);

	response.json({ token, username: user.username, name: user.name });
});

module.exports = { loginRouter: router };

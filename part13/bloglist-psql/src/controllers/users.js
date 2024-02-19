const router = require('express').Router();
const { User } = require('../models');
const { userFinder } = require('../utils/middleware');

router.get('/', async (_req, res) => {
	const users = await User.findAll();
	res.json(users);
});

router.post('/', async (req, res) => {
	const user = await User.create(req.body);
	res.json(user);
});

router.put('/:username', userFinder, async (req, res) => {
	req.user.username = req.body.username;
	await req.user.save();
	res.json(req.user);
});

module.exports = { usersRouter: router };

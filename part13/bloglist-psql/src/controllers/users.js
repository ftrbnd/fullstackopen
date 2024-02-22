const router = require('express').Router();
const { User, Blog } = require('../models');
const { userFinder } = require('../utils/middleware');

router.get('/', async (_req, res) => {
	const users = await User.findAll({
		include: {
			model: Blog,
			attributes: { exclude: ['userId'] },
		},
	});
	res.json(users);
});

router.get('/:id', async (req, res) => {
	let where = {};

	if (req.query.read) {
		where = {
			read: req.query.read === 'true',
		};
	}

	const user = await User.findByPk(req.params.id, {
		include: [
			{
				model: Blog,
				attributes: { exclude: ['userId'] },
			},
			{
				model: Blog,
				as: 'saved_blogs',
				attributes: { exclude: ['userId'] },
				through: {
					attributes: ['read', 'id'],
					where,
				},
			},
		],
	});

	res.json(user);
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

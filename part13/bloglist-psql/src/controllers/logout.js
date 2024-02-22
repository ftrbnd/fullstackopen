const router = require('express').Router();
const { Session } = require('../models');
const { tokenExtractor } = require('../utils/middleware');

router.post('/', tokenExtractor, async (request, response) => {
	const session = await Session.findOne({
		where: {
			userId: request.decodedToken.id,
		},
	});

	await session.destroy();

	response.sendStatus(204);
});

module.exports = { logoutRouter: router };

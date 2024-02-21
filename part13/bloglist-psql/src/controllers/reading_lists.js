const { ReadingList } = require('../models');

const router = require('express').Router();

router.post('/', async (req, res) => {
	const readingList = await ReadingList.create({
		userId: req.body.userId,
		blogId: req.body.blogId,
	});

	res.json(readingList);
});

module.exports = {
	readingListsRouter: router,
};

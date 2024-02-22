const { ReadingList } = require('../models');
const { tokenExtractor } = require('../utils/middleware');

const router = require('express').Router();

router.post('/', async (req, res) => {
	const readingList = await ReadingList.create({
		userId: req.body.userId,
		blogId: req.body.blogId,
	});

	res.json(readingList);
});

router.put('/:id', tokenExtractor, async (req, res) => {
	const readingList = await ReadingList.findByPk(req.params.id);

	if (readingList.userId !== req.decodedToken.id) {
		throw Error('Invalid user');
	}

	readingList.read = req.body.read;
	await readingList.save();
	res.json(readingList);
});

module.exports = {
	readingListsRouter: router,
};

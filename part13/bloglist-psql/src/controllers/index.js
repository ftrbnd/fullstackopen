const { authorsRouter } = require('./authors');
const { blogsRouter } = require('./blogs');
const { loginRouter } = require('./login');
const { logoutRouter } = require('./logout');
const { readingListsRouter } = require('./reading_lists');
const { usersRouter } = require('./users');

module.exports = {
	authorsRouter,
	blogsRouter,
	loginRouter,
	readingListsRouter,
	usersRouter,
	logoutRouter,
};

const express = require('express');
require('express-async-errors');
const { PORT } = require('./utils/config');
const { connectToDatabase } = require('./utils/db');
const { errorHandler } = require('./utils/middleware');
const {
	blogsRouter,
	usersRouter,
	loginRouter,
	authorsRouter,
	readingListsRouter,
	logoutRouter,
} = require('./controllers');

const app = express();

app.use(express.json());
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/readinglists', readingListsRouter);
app.use('/api/logout', logoutRouter);
app.use(errorHandler);

const start = async () => {
	await connectToDatabase();
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
};

start();

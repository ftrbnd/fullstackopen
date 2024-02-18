require('dotenv').config();
const express = require('express');
const { blogsRouter } = require('./routes/blogs');

const app = express();

app.use(express.json());
app.use('/api/blogs', blogsRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

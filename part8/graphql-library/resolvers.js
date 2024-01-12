const Book = require('./models/Book');
const Author = require('./models/Author');
const User = require('./models/User');
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();

const resolvers = {
	Query: {
		bookCount: async () => Book.collection.countDocuments(),
		authorCount: async () => Author.collection.countDocuments(),
		allBooks: async (root, args) => {
			if (args.author) {
				const author = await Author.findOne({ name: args.author });
				if (args.genre) {
					return Book.find({ author, genres: args.genre });
				}
				return Book.find({ author });
			} else if (args.genre) {
				return Book.find({ genres: args.genre });
			}

			return Book.find({});
		},
		allAuthors: async () => Author.find({}),
		me: (root, args, { currentUser }) => {
			return currentUser;
		},
	},
	Mutation: {
		addBook: async (root, args, { currentUser }) => {
			let book = null;

			if (!currentUser) {
				throw new GraphQLError('not authenticated', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				});
			}

			const authorExists = await Author.findOne({ name: args.author });
			if (!authorExists) {
				const author = new Author({ name: args.author, bookCount: 1 });
				const newAuthor = await author.save();

				book = new Book({ ...args, author: newAuthor });
			} else {
				authorExists.bookCount = authorExists.bookCount + 1;
				await authorExists.save();

				book = new Book({ ...args, author: authorExists });
			}

			try {
				await book.save();
			} catch (error) {
				console.log(error);
				throw new GraphQLError('Saving book failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.title,
						error,
					},
				});
			}

			pubsub.publish('BOOK_ADDED', { bookAdded: book });

			return book;
		},
		editAuthor: async (root, args, { currentUser }) => {
			if (!currentUser) {
				throw new GraphQLError('not authenticated', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				});
			}

			const author = await Author.findOne({ name: args.name });
			if (!author) return null;

			author.born = args.setBornTo;

			try {
				await author.save();
			} catch (error) {
				throw new GraphQLError('Saving author failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.name,
						error,
					},
				});
			}

			return author;
		},
		createUser: async (root, args) => {
			const user = new User({
				username: args.username,
				favoriteGenre: args.favoriteGenre,
			});

			try {
				await user.save();
			} catch (error) {
				throw new GraphQLError('Creating the user failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.username,
						error,
					},
				});
			}

			return user;
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username });

			if (!user || args.password !== 'secret') {
				throw new GraphQLError('wrong credentials', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				});
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			};

			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
		},
	},
	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
		},
	},
	Book: {
		author: async (root) => {
			const author = await Author.findById(root.author);
			return author;
		},
	},
};

module.exports = resolvers;

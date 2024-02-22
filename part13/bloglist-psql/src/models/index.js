const { Blog } = require('./Blog');
const { ReadingList } = require('./ReadingList');
const { Session } = require('./Session');
const { User } = require('./User');

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: ReadingList, as: 'saved_blogs' });
Blog.belongsToMany(User, { through: ReadingList, as: 'users_saved' });

User.hasMany(Session);
Session.belongsTo(User);

module.exports = {
	Blog,
	User,
	ReadingList,
	Session,
};

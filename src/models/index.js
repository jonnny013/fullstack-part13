const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readingList')
const Session = require('./tokenSession')

User.hasMany(Blog)
Blog.belongsTo(User)

User.hasOne(Session)
Session.belongsTo(User)

User.hasMany(ReadingList)
ReadingList.belongsTo(User)
Blog.hasMany(ReadingList)
ReadingList.belongsTo(Blog)
User.belongsToMany(Blog, {through: ReadingList})
Blog.belongsToMany(User, { through: ReadingList })


module.exports = { Blog, User, ReadingList }
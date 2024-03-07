const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readingList')
const UserReadings = require('./userReadings')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(ReadingList, { through: UserReadings})
ReadingList.belongsToMany(User, { through: UserReadings })


module.exports = { Blog, User, ReadingList, UserReadings }
const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    const blogsTableInfo = await queryInterface.describeTable('blogs')
    if (!blogsTableInfo['year']) {
      await queryInterface.addColumn('blogs', 'year', {
        type: DataTypes.INTEGER,
        defaultValue: 2024,
        validate: { min: 1991, max: new Date().getFullYear() },
      })
    }
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year')
  },
}

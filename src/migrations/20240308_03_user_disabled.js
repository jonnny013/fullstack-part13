const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    const blogsTableInfo = await queryInterface.describeTable('users')
    if (!blogsTableInfo['disabled']) {
      await queryInterface.addColumn('users', 'disabled', {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      })
    }
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('users', 'disabled')
  },
}

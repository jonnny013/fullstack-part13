const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class UserReadings extends Model {}

UserReadings.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    readingListId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'readingList', key: 'id' },
    },
    unread: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'userReadings',
  }
)

module.exports = UserReadings

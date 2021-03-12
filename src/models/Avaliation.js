const { Model, DataTypes } = require('sequelize')

class Avaliation extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      avaliation: DataTypes.STRING
    }, {
      sequelize
    })
  }
}

module.exports = Avaliation
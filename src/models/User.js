//User
const { Model, DataTypes } = require('sequelize')

class User extends Model {
  static init(sequelize) {
    super.init({
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.INTEGER,
        level: DataTypes.INTEGER,
        acess: DataTypes.STRING,
    }, {
      sequelize
    })
  }
}

module.exports = User
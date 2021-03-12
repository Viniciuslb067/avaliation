//Admin
const { Model, DataTypes } = require('sequelize')

class Avaliation extends Model {
  static init(sequelize) {
    super.init({
      question: DataTypes.STRING,
      requester: DataTypes.STRING,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      objective: DataTypes.STRING,
      status: DataTypes.INTEGER,
    }, {
      sequelize
    })
  }
}

module.exports = Avaliation
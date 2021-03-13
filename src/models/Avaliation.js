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
      system: DataTypes.STRING,
      status: DataTypes.INTEGER,
    }, {
      sequelize
    })
  }
  static associate(models) {
    this.hasMany(models.Result, { foreignKey: 'avaliation_id:', as: 'results' })
}
}

module.exports = Avaliation
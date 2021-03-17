//Admin
const { Model, DataTypes } = require('sequelize')

class Result extends Model {
  static init(sequelize) {
    super.init({
        ip_user: DataTypes.INTEGER,
        avaliation_id: DataTypes.INTEGER,
        system_id: DataTypes.INTEGER,
        note: DataTypes.INTEGER,
        comments: DataTypes.STRING,
        status: DataTypes.STRING
    }, {
      sequelize
    })
  }
  static associate(models) {
      this.belongsTo(models.Avaliation, { foreignKey: 'avaliation_id:', as: 'owner' })
  }
  static associate(models) {
    this.belongsTo(models.System, { foreignKey: 'system_id:', as: 'owner' })
}
}

module.exports = Result
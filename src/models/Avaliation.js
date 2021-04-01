//Admin
const { Model, DataTypes } = require('sequelize')

class Avaliation extends Model {
  static init(sequelize) {
    super.init({
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      question: DataTypes.STRING,
      requester: DataTypes.STRING,
      start_date: DataTypes.DATEONLY,
      end_date: DataTypes.DATEONLY,
      system: DataTypes.STRING,
      status: DataTypes.STRING,
    }, {
      sequelize
    })
  }
  static associate(models) {
    this.hasMany(models.Result, { foreignKey: 'avaliation_id:', as: 'results' })
}
}

module.exports = Avaliation
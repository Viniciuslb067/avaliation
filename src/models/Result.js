//Admin
const { Model, DataTypes } = require('sequelize')

class Result extends Model {
  static init(sequelize) {
    super.init({
        uuid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4
        },
        ip_user: DataTypes.STRING,
        avaliation_id: DataTypes.INTEGER,
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
}

module.exports = Result
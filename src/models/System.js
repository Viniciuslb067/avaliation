//Admin
const { Model, DataTypes } = require('sequelize')

class System extends Model {
  static init(sequelize) {
    super.init({
        system: DataTypes.STRING,
        name: DataTypes.STRING,
        area: DataTypes.STRING,
    }, {
      sequelize
    })
  }  
  static associate(models) {
    this.hasMany(models.Result, { foreignKey: 'system_id:', as: 'results' })
  }
}

module.exports = System
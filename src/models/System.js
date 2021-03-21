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
}

module.exports = System
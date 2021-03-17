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
  isCorrectPassword = (password, callback) => {
    bcrypt.compare(password, this.password, function(err, same) {
        if(err) {
            callback(err)
        } else {
            callback(err, same)
        }
    })
}

}

module.exports = User
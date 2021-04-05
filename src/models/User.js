//User
const { Model, DataTypes } = require('sequelize')

class User extends Model {
  static init(sequelize) {
    super.init({
        uuid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.INTEGER,
        role: DataTypes.INTEGER,
        access: DataTypes.STRING,
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
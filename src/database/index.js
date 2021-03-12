const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const Avaliation = require('../models/Avaliation')
const Result = require('../models/Result')
const User = require('../models/User')

const connection = new Sequelize(dbConfig)

Avaliation.init(connection)
Result.init(connection)

Avaliation.associate(connection.models)
Result.associate(connection.models)

User.init(connection)

module.exports = connection
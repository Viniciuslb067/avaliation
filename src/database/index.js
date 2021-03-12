const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const Avaliation = require('../models/Avaliation')

const connection = new Sequelize(dbConfig)

Avaliation.init(connection)

module.exports = connection
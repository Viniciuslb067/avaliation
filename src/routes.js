const express = require('express')
const AvaliationController = require('./controllers/AvaliationController')

const routes = express.Router()

routes.get('/avaliate', AvaliationController.index)
routes.post('/avaliate', AvaliationController.store)

module.exports = routes
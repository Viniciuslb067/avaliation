const express = require('express')

const AvaliationController = require('./controllers/AvaliationController')
const ResultControlller = require('./controllers/ResultController')

const routes = express.Router()

routes.get('/avaliate', AvaliationController.index)
routes.post('/avaliate', AvaliationController.store)

routes.post('/avaliate/:avaliation_id/avaliation', ResultControlller.store)

module.exports = routes
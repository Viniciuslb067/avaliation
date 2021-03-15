const express = require('express')

const AvaliationController = require('./controllers/AvaliationController')
const ResultController = require('./controllers/ResultController')
const UserController = require('./controllers/UserController')

const routes = express.Router()

routes.get('/edit/:id', AvaliationController.edit)
routes.get('/avaliate', AvaliationController.index)
routes.delete('/delete/:id', AvaliationController.delete)
routes.post('/avaliate', AvaliationController.store)

routes.get('/avaliate/:avaliation_id/avaliation', ResultController.index)
routes.post('/avaliate/:avaliation_id/avaliation', ResultController.store)

routes.post('/register', UserController.store)
routes.get('/login/check', UserController.loginCheck)
routes.post('/login', UserController.login)

module.exports = routes
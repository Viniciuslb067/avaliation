const express = require('express')

const AvaliationController = require('./controllers/AvaliationController')
const ResultController = require('./controllers/ResultController')
const UserController = require('./controllers/UserController')
const SystemController = require('./controllers/SystemController')

const routes = express.Router()

routes.get('/edit/:id', AvaliationController.edit)
routes.put('/edit', AvaliationController.update)
routes.get('/avaliate', AvaliationController.index)
routes.delete('/delete/:id', AvaliationController.delete)
routes.post('/avaliate', AvaliationController.store)

routes.get('/avaliate/:avaliation_id/avaliation', ResultController.index)
routes.post('/avaliate/:avaliation_id/system/:system_id', ResultController.store)

routes.get('/login/check', UserController.loginCheck)
routes.get('/logout', UserController.logout)
routes.post('/register', UserController.store)
routes.post('/login', UserController.login)

routes.get('/system', SystemController.index)
routes.post('/register/system', SystemController.create)

module.exports = routes
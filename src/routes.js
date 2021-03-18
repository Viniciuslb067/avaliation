const express = require('express')

const AvaliationController = require('./controllers/AvaliationController')
const ResultController = require('./controllers/ResultController')
const UserController = require('./controllers/UserController')
const SystemController = require('./controllers/SystemController')
const User = require('./models/User')

const routes = express.Router()

routes.get('/edit/:id', AvaliationController.edit)
routes.put('/edit', AvaliationController.update)
routes.get('/avaliacao', AvaliationController.index)
routes.get('/avaliacao/inativa', AvaliationController.inactiveAssessments)
routes.get('/avaliar', AvaliationController.avaliar)
routes.delete('/delete/:id', AvaliationController.delete)
routes.post('/avaliate', AvaliationController.store)

routes.get('/avaliate/:avaliation_id/avaliation', ResultController.index)
routes.post('/avaliate/:avaliation_id/system/:system_id', ResultController.store)

routes.get('/all', UserController.all)
routes.get('/login/check', UserController.loginCheck)
routes.get('/logout', UserController.logout)
routes.post('/register', UserController.store)
routes.post('/login', UserController.login)
routes.delete('/delete/user/:id', UserController.deleteUser)

routes.get('/system', SystemController.index)
routes.post('/register/system', SystemController.create)

module.exports = routes
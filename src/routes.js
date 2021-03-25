const express = require('express')

const AvaliationController = require('./controllers/AvaliationController')
const ResultController = require('./controllers/ResultController')
const UserController = require('./controllers/UserController')
const SystemController = require('./controllers/SystemController')

const routes = express.Router()

routes.get('/edit/:id', AvaliationController.edit)
routes.put('/edit', AvaliationController.update)
routes.get('/avaliacao/ativa', AvaliationController.avaliacaoAtiva)
routes.get('/avaliacao/inativa', AvaliationController.avaliacaoInativa)
// routes.get('/avaliar', AvaliationController.avaliar)
routes.delete('/delete/:id', AvaliationController.delete)
routes.post('/avaliate', AvaliationController.store)

routes.get('/avaliate', ResultController.index)
routes.get('/data/:avaliation_id', ResultController.data)
routes.get('/comments/:avaliation_id', ResultController.comments)
routes.get('/count/all/notes/:avaliation_id', ResultController.count)
routes.get('/count/all/status/:avaliation_id', ResultController.countStatus)
routes.post('/avaliate/:avaliation_id', ResultController.submit)
routes.post('/avaliate/skip/:avaliation_id', ResultController.skip)

routes.get('/all', UserController.all)
routes.get('/login/check', UserController.loginCheck)
routes.get('/logout', UserController.logout)
routes.post('/register', UserController.store)
routes.post('/login', UserController.login)
routes.delete('/delete/user/:id', UserController.deleteUser)

routes.get('/system', SystemController.index)
routes.post('/register/system', SystemController.create)

module.exports = routes
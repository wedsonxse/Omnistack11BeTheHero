const express = require('express')
const OngController = require('./Controllers/OngController')
const IncidentController = require('./Controllers/IncidentController')
const ProfileController = require('./Controllers/ProfileController')
const SessionController = require('./Controllers/SessionController')

const routes = express.Router()

routes.post('/sessions',SessionController.create)

routes.get('/ongs', OngController.list)
routes.post('/ongs', OngController.create)

routes.post('/incidents',IncidentController.create)
routes.get('/incidents',IncidentController.list)
routes.delete('/incidents/:id', IncidentController.delete)
routes.get('/profile',ProfileController.list)

module.exports = routes
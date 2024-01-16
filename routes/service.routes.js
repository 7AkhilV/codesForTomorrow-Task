const express = require('express');
const serviceController = require('../controllers/service.controller')
const authMiddleware = require('../middleware/auth')

const Router = express.Router();

Router.use(authMiddleware)

Router.post('/category/:categoryId/service',serviceController.addService)

Router.get('/category/:categoryId/services',serviceController.getAllServices)

Router.delete('/category/:categoryId/service/:serviceId',serviceController.deleteService)

Router.put('/category/:categoryId/service/:serviceId',serviceController.updateService)

module.exports = Router;


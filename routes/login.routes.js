const express = require('express')
const loginController = require('../controllers/login.controller')

const Router = express.Router()

Router.post('/login',loginController)

module.exports = Router
const express = require('express');
const categoryController = require('../controllers/categories.controllers')
const authMiddleware = require('../middleware/auth')

const Router = express.Router()

Router.use(authMiddleware)

Router.get('/category',categoryController.getAllCategories)

Router.post('/categories',categoryController.createCategory)

Router.put('/category/:categoryId',categoryController.updateCategory)

Router.delete('/category/:categoryId',categoryController.deleteCategory)


module.exports = Router;


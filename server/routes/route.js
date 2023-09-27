const routes = require('express').Router()
const controller = require("../controller/controller")
routes.route('/api/categories').post(controller.createCategories)

module.exports = routes
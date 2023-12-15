const express = require('express')
const route = express.Router();
const loginController = require('./../../controllers/commonController/login.c')

route.post('/', loginController.processLogin)
route.get('/', loginController.showLogin);

module.exports = route;
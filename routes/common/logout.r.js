const express = require('express')
const route = express.Router();
const logoutController = require('./../../controllers/commonController/logout.c')


route.get('/', logoutController.logout);
module.exports = route;
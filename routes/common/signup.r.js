const express = require('express')
const route = express.Router();
const signupController = require('./../../controllers/commonController/signup.c')


route.post('/', signupController.processSignup);
route.get('/', signupController.showSignUp);

module.exports = route;
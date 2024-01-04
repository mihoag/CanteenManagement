const route = require('express').Router();
const dashBoardController = require('../../controllers/adminController/dashboardController');

route.get("/",dashBoardController.showPage);
module.exports = route;
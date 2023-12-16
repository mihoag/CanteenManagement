const express = require("express");
const route = express.Router();
const marketingController = require("../../controllers/adminController/marketingController");

route.get("/", marketingController.showPage);
route.get("/statistics/1", marketingController.showStatisticsPage1);
module.exports = route;

const express = require("express");
const route = express.Router();
const statictisController = require("../../controllers/adminController/statisticController");

route.get("/1", statictisController.showStatisticsPage1);
route.get("/2", statictisController.showStatisticsPage2);
route.get("/3", statictisController.showStatisticsPage3);
route.get("/4", statictisController.showStatisticsPage4);

module.exports = route;

const express = require("express");
const route = express.Router();
const statictisController = require("../../controllers/adminController/statisticController");

route.get("/1", statictisController.showStatisticsPage1);
route.get("/2", statictisController.showStatisticsPage2);
route.get("/3", statictisController.showStatisticsPage3);
route.get("/4", statictisController.showStatisticsPage4);

route.get('/revenue/:month/:year', statictisController.getDataRevenue);
route.get('/revenueW/:from/:to', statictisController.getDataRevenueWeek);

route.get("/stats2/:page/:month/:year", statictisController.getData2Table);
route.get("/stats4/:page", statictisController.getData4Table);


module.exports = route;

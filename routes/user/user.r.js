const express = require("express");
const route = express.Router();
const homeController = require("./../../controllers/userController/homeController.c");
const orderController = require("./../../controllers/userController/orderController.c");
const profileRoute = require("./profile.r");

route.get("/order", orderController.showOrder);
route.get("/", homeController.showHome);

route.use("/profile", profileRoute);
module.exports = route;

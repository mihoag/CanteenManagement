const express = require("express");
const cartController = require("./../../controllers/userController/cartController");
const route = express.Router();

route.get("/my-cart-items", cartController.getAllCartItems);

module.exports = route;

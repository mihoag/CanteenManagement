const express = require("express");
const cartController = require("./../../controllers/userController/cartController");
const orderController = require("./../../controllers/userController/orderController.c");
const route = express.Router();

route.get("/my-cart-items", cartController.getAllCartItems);
route.delete("/item", cartController.deleteCartItem);
route.post("/payment", orderController.addOrder); // add new order
module.exports = route;

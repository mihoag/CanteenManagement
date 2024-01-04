const express = require("express");
const cartController = require("./../../controllers/userController/cartController");
const route = express.Router();

route.get("/my-cart-items", cartController.getAllCartItems);
route.delete("/item", cartController.deleteCartItem);
module.exports = route;

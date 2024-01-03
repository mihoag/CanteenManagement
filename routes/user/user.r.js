const express = require("express");
const route = express.Router();
const homeController = require("./../../controllers/userController/homeController.c");
const orderController = require("./../../controllers/userController/orderController.c");
const menuController = require('./../../controllers/userController/menuController.c');
const detailFoodController = require('./../../controllers/userController/detailFoodController');
const cartController = require("./../../controllers/userController/cartController");
const profileRoute = require("./profile.r");

route.get("/order", orderController.showOrder);
route.get("/cart", cartController.showCart);
route.get("/", homeController.showHome);
route.use("/profile", profileRoute);

// router for menu
route.get("/menu",menuController.menuFoods );
route.get("/menu/new",menuController.newFoods );
route.get("/menu/promotion",menuController.promotionFoods );
route.get("/menu/bestsell",menuController.saleFoods );
route.get("/menu/favorite",menuController.favoriteFoods );
route.get("/menu/all",menuController.allFoods );

//detail food
route.get("/menu/food/:FoodId",detailFoodController.detailFood);
module.exports = route;

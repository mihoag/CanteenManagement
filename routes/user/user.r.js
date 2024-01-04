const express = require("express");
const route = express.Router();
const homeController = require("./../../controllers/userController/homeController.c");
const orderController = require("./../../controllers/userController/orderController.c");
const menuController = require("./../../controllers/userController/menuController.c");
const detailFoodController = require("./../../controllers/userController/detailFoodController");
const cartController = require("./../../controllers/userController/cartController");
const profileRoute = require("./profile.r");
const userController = require("./../../controllers/userController/userController.c");

route.get("/order", orderController.showOrder);
route.get("/cart", cartController.showCart);
route.post("/naptien", userController.updateSodu);
route.use("/profile", profileRoute);
route.post("/detailOrder", orderController.Orderdetail);

// router for menu
route.get("/menu", menuController.menuFoods);
route.get("/menu/new", menuController.newFoods);
route.get("/menu/promotion", menuController.promotionFoods);
route.get("/menu/bestsell", menuController.saleFoods);
route.get("/menu/favorite", menuController.favoriteFoods);
route.get("/menu/all", menuController.allFoods);
//detail food
route.get("/menu/:FoodId", detailFoodController.detailFood);
//add item to cart
route.get("/cart/:FoodId", cartController.AddItemToCart);
route.get("/", homeController.showHome);
module.exports = route;

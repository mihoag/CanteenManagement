const express = require("express");
const route = express.Router();
const profileController = require("./../../controllers/userController/profileController.c");

route.get("/", profileController.showProfile);
route.post("/edit", profileController.editProfile);
module.exports = route;

const express = require("express");
const route = express.Router();
const marketingController = require("../../controllers/adminController/marketingController");
const upload = require("../../utils/multer");

route.get("/", marketingController.showPage);
route.post("/", upload.single("image"), marketingController.handlePost);

module.exports = route;

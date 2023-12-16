const express = require("express");
const route = express.Router();

route.use("/marketing", require("./marketing.r"));
route.use("/statictis", require("./statictis.r"));
module.exports = route;

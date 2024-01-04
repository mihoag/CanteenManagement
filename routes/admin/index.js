const express = require("express");
const route = express.Router();

route.use("/", require("./marketing.r"));
route.use("/marketing", require("./marketing.r"));
route.use("/statistics", require("./statistics.r"));
route.use('/customers', require('./customers.r'))
route.use('/products', require('./products.r'))
route.use('/orders', require('./orders.r'))
route.use('/dashboard', require('./dashboard.r'))
module.exports = route;

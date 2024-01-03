const express = require("express");
const route = express.Router();

route.use("/", require("./marketing.r"));
route.use("/marketing", require("./marketing.r"));
route.use("/statistics", require("./statistics.r"));
route.use('/customers', require('./customers.r'))
route.get('/products', require('./products.r'))
route.get('/orders', require('./orders.r'))
module.exports = route;

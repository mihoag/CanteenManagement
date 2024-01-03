const express = require("express");
const route = express.Router();

route.use("/", require("./marketing.r"));
route.use("/marketing", require("./marketing.r"));
route.use("/statictis", require("./statictis.r"));
route.use('/customers', require('./customers.r'))
route.get('/products', require('./products.r'))
route.get('/orders', require('./orders.r'))
module.exports = route;

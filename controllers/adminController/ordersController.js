const Order = require('../../model/order.m');

class ordersController {
    async showOrders(req, res, next) {
        try {
            const data = await Order.getOrdersList();
            res.json(data);
            // console.log(data);
            res.render("admin/orders", {
                layout: "adminLayout",
                title: "Orders",
                isOrders: true,
                css: 'orders',
                js: 'orders',   
              });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new ordersController();
const Order = require('../../model/order.m');

class ordersController {
    async showOrders(req, res, next) {
        try {
            const pageNum = req.query.page||1;
            const search = req.query.search;
            const data = await Order.getOrdersList(pageNum, search);
            res.render("admin/orders", {
                layout: "adminLayout",
                title: "Orders",
                isOrders: true,
                css: 'orders',
                js: 'orders',
                data: data,
                search: search
              });
        } catch (error) {
            next(error);
        }
    }

    async page(req, res, next) {
        try {
            const pageNum = req.query.page;
            const search = req.query.search;
            const data = await Order.getOrdersList(pageNum, search);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async addOrder(req, res, next) {
        try {
            const result = await Order.addOrder(req.body);
            if(result[0]) {
                res.status(200).json(result[1]);
            } else {
                res.status(406).json(result[1]);
            }
        } catch (error) {
            next(error);
        }
    }

    
}
module.exports = new ordersController();
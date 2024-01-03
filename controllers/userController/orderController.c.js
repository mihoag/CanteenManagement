const orderUser = require('../../model/orderUser.m')
const { pgp, db } = require("../../configs/DBconnection");
class orderController {
    async showOrder(req, res, next) {
        try {
            let listOrder = await orderUser.getAll();
            res.render("user/order", { layout: "userLayout", username: req.session.username, listOrder: listOrder });
        } catch (error) {
            next(error);
        }
    }

    async Orderdetail(req, res, next) {
        try {
            let id = req.body.id;
            //console.log(id);
            let data = await db.any('select o.*, i."price", i."image", i."name" from "orderdetail" o , "item" i  where o.id_item = i.id_item and o.id_order = $1', [id]);
            res.status(200).json({ listDetail: data });
        } catch (error) {
            res.status(400).json({ msg: "Error" });
        }
    }

}
module.exports = new orderController;
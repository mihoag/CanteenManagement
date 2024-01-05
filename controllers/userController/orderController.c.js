const orderUser = require("../../model/orderUser.m");
const { pgp, db } = require("../../configs/DBconnection");
class orderController {
  async showOrder(req, res, next) {
    try {
      let listOrder = await orderUser.getAll();
      res.render("user/order", {
        layout: "userLayout",
        username: req.session.username,
        listOrder: listOrder,
      });
    } catch (error) {
      next(error);
    }
  }

  async Orderdetail(req, res, next) {
    try {
      let id = req.body.id;
      //console.log(id);
      let data = await db.any(
        'select o.*, i."price", i."image", i."name" from "orderdetail" o , "item" i  where o.id_item = i.id_item and o.id_order = $1',
        [id]
      );
      res.status(200).json({ listDetail: data });
    } catch (error) {
      res.status(400).json({ msg: "Error" });
    }
  }

  async addOrder(req, res, next) {
    try {
      //   console.log(req.body);
      const { item_ids, quantities, total_price } = req.body;
      // Check if total_price < account balance

      const username = req.session.username;
      const order = await orderUser.addOrder({ ...req.body, username });
      //   console.log(order);

      const { id_order } = order[0];

      // Check if quantity satifies item stock

      const orderDetails = await Promise.all(
        item_ids.map(async (item_id, index) => {
          return await orderUser.addOrderDetail({
            id_order,
            item_id,
            quantity: quantities[index],
          });
        })
      );
      //   console.log(orderDetails);
      res.status(200).json({
        status: "success",
        data: { order, orderDetails },
      });
    } catch (err) {
      res.status(400).json({ msg: "Error" });
    }
  }
}
module.exports = new orderController();

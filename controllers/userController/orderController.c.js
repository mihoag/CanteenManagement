const orderUser = require("../../model/orderUser.m");
const userModel = require("../../model/user.m");
const itemModel = require("../../model/item.m");
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
      const username = req.session.username;

      let user = await userModel.selectByUsername(username);
      const { id_user, money } = user;
      // Check if total_price < account balance
      let err;
      if (total_price > money) {
        err = new Error("Số dư trong tài khoản không đủ ! Thanh toán thất bại");
        err.isOperational = true;
        throw err;
      }

      // Check if quantity satifies item stock
      const remainingQuantity = [];
      for (let i = 0; i < item_ids.length; i++) {
        const { quantity, name } = await itemModel.getItem(item_ids[i]);
        if (quantity < quantities[i]) {
          err = new Error(`Không đủ hàng cho ${name}`);
          err.isOperational = true;
          throw err;
        } else {
          remainingQuantity.push(quantity);
        }
      }

      // update quantity in item table
      for (let i = 0; i < item_ids.length; i++) {
        await itemModel.updateItemQuantity(
          item_ids[i],
          remainingQuantity[i] - quantities[i]
        );
      }

      // update user's balance
      user.money = money - total_price;
      user = await userModel.updateProfile(user);

      const order = await orderUser.addOrder({ ...req.body, id_user });
      //   console.log(order);
      const { id_order } = order[0];

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
      res
        .status(400)
        .json({ errMsg: err.message, isOperational: err.isOperational });
    }
  }
}
module.exports = new orderController();

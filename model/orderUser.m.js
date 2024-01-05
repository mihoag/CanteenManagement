const db = require("../db/db");
module.exports = class Orderuser {
  constructor(
    id_order,
    id_user,
    order_date,
    status,
    payment,
    id_cashier,
    total_price
  ) {
    this.id_order = id_order;
    this.id_user = id_user;
    this.order_date = order_date;
    this.status = status;
    this.payment = payment;
    this.id_cashier = id_cashier;
    this.total_price = total_price;
  }
  // insert account into db

  static async getAll() {
    try {
      let data = await db.selectAll("order");
      return data;
    } catch (error) {
      throw error;
    }
  }
  static async getDetailById(id_order) {
    try {
      let data = await db.selectByOneField("orderdetail", "id_order", id_order);
      return data;
    } catch (error) {
      //throw error;
    }
  }

  static async getOrderByUsername(username) {
    try {
      //let data = await 
      let data = await db.query(`select * from "order" o, "user" u WHERE o.id_user= u.id_user and u.username = '${username}'`);
      return data;
    } catch (error) {

    }
  }

  static async addOrder(orderData) {
    try {
      //   console.log(orderData);
      const { id_user, total_price } = orderData;
      const data = await db.query(
        `INSERT INTO "order"("id_user","order_date","total_price") VALUES (${id_user},current_timestamp,${total_price}) returning *`
      );
      return data;
    } catch (err) {
      throw err;
    }
  }

  static async addOrderDetail(orderData) {
    try {
      const { id_order, item_id, quantity } = orderData;
      //   console.log(orderData);
      const data = await db.query(
        `INSERT INTO "orderdetail"("id_order","id_item","quantity") VALUES (${id_order},${item_id},${quantity}) returning *`
      );
      return data[0];
    } catch (err) {
      throw err;
    }
  }
};

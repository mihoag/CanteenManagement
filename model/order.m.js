const db = require("../db/db");
const pageSize = 10;
class Order {
  constructor(order) {
    this.id_order = order?.id_order;
    this.id_user = order?.id_user;
    this.order_date = order?.order_date;
    this.status = order?.status;
    this.payment = order?.payment;
    this.id_cashier = order?.id_cashier;
    this.total_price = order?.total_price;
    this.items = order?.items;
  }

  static async getOrdersList(pageNum, search) {
    try {
      let totalItems;
      let numberOfPages;
      let orders;
      if (!search) {
        totalItems = await db.query(
          `SELECT * FROM "order" ORDER BY "order_date" LIMIT 100`
        );
        numberOfPages = Math.ceil(totalItems.length / pageSize);
        const offset = (pageNum - 1) * pageSize;
        orders = await db.query(
          `SELECT * FROM "order" ORDER BY "order_date" LIMIT ${pageSize} OFFSET ${offset}`
        );
      } else {
        totalItems = await db.query(
          `SELECT * FROM "order", "user" WHERE "order"."id_user" = "user"."id_user" AND LOWER("user"."name") LIKE LOWER('%${search}%') ORDER BY "order_date" LIMIT 50`
        );
        numberOfPages = Math.ceil(totalItems.length / pageSize);
        const offset = (pageNum - 1) * pageSize;
        orders = await db.query(
          `SELECT * FROM "order", "user" WHERE "order"."id_user" = "user"."id_user" AND LOWER("user"."name") LIKE LOWER('%${search}%') ORDER BY "order_date" LIMIT ${pageSize} OFFSET ${offset}`
        );
      }
      const listOrders = await Promise.all(
        orders.map(async (order) => {
          //Handle order_date
          const date = new Date(order.order_date);
          const options = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          };
          const formattedDate = date.toLocaleDateString("en-GB", options);
          order.order_date = formattedDate;

          //Get user order information
          const user = await db.selectByOneField(
            "user",
            "id_user",
            order.id_user
          );
          order.user = {
            name: user[0].name,
            username: user[0].username,
          };

          //get order's items
          const items = await db.selectByOneField(
            "orderdetail",
            "id_order",
            order.id_order
          );

          let discount = 0;
          let originPrice = 0;
          order.items = await Promise.all(
            items.map(async (item, index) => {
              const detail = await db.selectByID(
                "item",
                "id_item",
                item.id_item
              );
              discount +=
                (parseFloat(detail.price) *
                  parseFloat(item.quantity) *
                  parseFloat(detail.discount)) /
                100;
              originPrice +=
                parseFloat(detail.price) * parseFloat(item.quantity);
              return {
                index: index + 1 + ".",
                id_item: item.id_item,
                name: detail.name,
                price: detail.price,
                quantity: item.quantity,
                money: parseFloat(detail.price) * parseFloat(item.quantity),
              };
            })
          );
          order.discount = discount;
          order.originPrice = originPrice;
          return order;
        })
      );
      let data = {
        pages: numberOfPages,
        page: pageNum,
        orders: listOrders,
      };
      return data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Order;

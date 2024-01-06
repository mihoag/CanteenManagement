const db = require("../db/db");
const pageSize = 20;
const OrderDetail = require("./orderdetail.m");
const Product = require("./product.m");

function isNumeric(str) {
  // Use a regular expression to test if the string contains only numbers
  return /^[0-9]+$/.test(str);
}


class Order {
  constructor(order) {
    this.id_user = order?.id_user||1;
    this.order_date = order?.order_date;
    this.status = "Completed";
    this.payment = order?.payment ||true;
    this.id_cashier = 1;
    this.total_price = order?.total_price;
  }


  static async getOrdersList(pageNum, search) {
    try {
      let Items = await db.query(
        `SELECT * FROM "item" WHERE "item".quantity > 0 ORDER BY "id_item" ASC`
      );
      let totalItems;
      let numberOfPages;
      let orders;
      let querySearch = `SELECT * FROM "order", "user" WHERE "order"."id_user" = "user"."id_user" AND LOWER("user"."name") LIKE LOWER('%${search}%') ORDER BY "id_order" DESC `
      if(search && isNumeric(search)) {
        querySearch = `SELECT * FROM "order", "user" WHERE "order"."id_user" = "user"."id_user" AND CAST("order"."id_order" AS VARCHAR) LIKE CAST('${search}%' AS VARCHAR) ORDER BY "id_order" DESC `
      }
      if (!search) {
        totalItems = await db.query(
          `SELECT * FROM "order" ORDER BY "id_order" DESC LIMIT 400`
        );
        numberOfPages = Math.ceil(totalItems.length / pageSize);
        const offset = (pageNum - 1) * pageSize;
        orders = await db.query(
          `SELECT * FROM "order" ORDER BY "id_order" DESC LIMIT ${pageSize} OFFSET ${offset}`
        );
      } else {
        totalItems = await db.query(querySearch + 'LIMIT 400');
        numberOfPages = Math.ceil(totalItems.length / pageSize);
        const offset = (pageNum - 1) * pageSize;
        orders = await db.query(
          querySearch+`LIMIT ${pageSize} OFFSET ${offset}`
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
        items: Items,
      };
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async addOrder(data) {
    try {
      if (data.items.length == 0) {
        return [false, "Chọn ít nhất 1 mặt hàng"];
      }

      for (const item of data.items) {
        if(item.quantity <=0){
          return [false, "Số lượng mặt hàng phải lớn hơn 0"];
        }
      }

      for (const item of data.items) {
        if (item.quantity <= 0) {
          return [false, "Số lượng mặt hàng phải lớn hơn 0"];
        }
      }
      for (const item of data.items) {
        const data = await db.selectByID('item', 'id_item', item.id_item);
        if (data && data.quantity >= item.quantity) {
          data.quantity -= item.quantity;
          await db.update('item', new Product(data), 'id_item', data.id_item);
        } else {
          return [false, "Số lượng sản phẩm không đủ"];
        }
      }
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      today = yyyy + "-" + mm + "-" + dd;
      data.order_date = today;
      const order = await db.insert("order", new Order(data));
      if (order) {
        await Promise.all(
          Array.from(data.items).map(async (item) => {
            await OrderDetail.addOrderDetail({
              id_order: order.id_order,
              id_item: item.id_item,
              quantity: item.quantity,
            });
          })
        );
        return [true, "Thêm đơn hàng thành công"];
      }
    } catch (error) {
      throw error;
    }
  }

  static async updatePayment(id) {
    try {
      const data = await db.selectByID('order', 'id_order', id);
      if(data) {
        await db.update('order', new Order(data), 'id_order', id);
        return [true, 'Cập nhập thành công, đơn hàng đã xác nhận thanh toán'];
      } else {
        return [false, 'Lỗi cập nhập']
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Order;

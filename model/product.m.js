const db = require("../db/db");
const pageSize = 10;
class Item {
  constructor(item) {
    this.id_item = item.id_item;
    this.name = item.name;
    this.price = item.price;
    this.discount = item.discount;
    this.quantity = item.quantity;
    this.saleprice = item.saleprice;
    this.cost = item.cost;
    this.image = item.image;
    this.type = item.type;
  }

  static async getProductsList(pageNum, search) {
    try {
      let totalItems;
      let numberOfPages;
      let items;
      if (!search) {
        totalItems = await db.query(
          `SELECT * FROM "item"`
        );
        numberOfPages = Math.ceil(totalItems.length / pageSize);
        const offset = (pageNum - 1) * pageSize;
        items = await db.query(
          `SELECT * FROM "item" LIMIT ${pageSize} OFFSET ${offset}`
        );
      } else {
        totalItems = await db.query(
          `SELECT * FROM "item" WHERE LOWER("item"."name") LIKE LOWER('%${search}%')`
        );
        numberOfPages = Math.ceil(totalItems.length / pageSize);
        const offset = (pageNum - 1) * pageSize;
        items = await db.query(
          `SELECT * FROM "item" WHERE LOWER("item"."name") LIKE LOWER('%${search}%') LIMIT ${pageSize} OFFSET ${offset}`
        );
      }
      let data = {
        pages: numberOfPages,
        page: pageNum,
        items: items,
      };
      return data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Item;

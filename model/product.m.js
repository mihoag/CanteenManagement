const db = require("../db/db");
const pageSize = 10;
class Item {
  constructor(item) {
    this.name = item?.name;
    this.price = item?.price;
    this.discount = item?.discount;
    this.quantity = item?.quantity;
    this.saleprice = item?.saleprice;
    this.cost = item?.cost;
    this.image = item?.image;
    this.type = item?.type;
    this.describe = item?.describe;
  }

  static async getProductsList(pageNum, search) {
    try {
      let totalItems;
      let numberOfPages;
      let items;
      if (!search) {
        totalItems = await db.query(
          `SELECT * FROM "item" ORDER BY "id_item" ASC`
        );
        numberOfPages = Math.ceil(totalItems.length / pageSize);
        const offset = (pageNum - 1) * pageSize;
        items = await db.query(
          `SELECT * FROM "item" ORDER BY "id_item" ASC LIMIT ${pageSize} OFFSET ${offset}`
        );
      } else {
        totalItems = await db.query(
          `SELECT * FROM "item" WHERE LOWER("item"."name") LIKE LOWER('%${search}% ORDER BY "id_item" ASC')`
        );
        numberOfPages = Math.ceil(totalItems.length / pageSize);
        const offset = (pageNum - 1) * pageSize;
        items = await db.query(
          `SELECT * FROM "item" WHERE LOWER("item"."name") LIKE LOWER('%${search}%') ORDER BY "id_item" ASC LIMIT ${pageSize} OFFSET ${offset}`
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

  static async addProduct(item) {
    const check = await db.selectByOneField('item', 'name', item.name);
    if(check.length>0) {
      return [false, 'Tên mặt hàng đã tồn tại'];
    }
    if(item.cost < 0 || item.price < 0 || item.cost > item.price || item.discount < 0 || item.quantity < 0) {
      return [false, 'Số liệu chưa hợp lệ'];
    }
    const saleprice = item.price - item.price*item.discount/100;
    item.saleprice = saleprice;
    const data = await db.insert('item', new Item(item));
    if(data) {
      return [true, 'Thêm mặt hàng thành công'];
    }
  }
}

module.exports = Item;

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
          `SELECT * FROM "item" WHERE LOWER("item"."name") LIKE LOWER('%${search}%') ORDER BY "id_item" ASC`
        );
        console.log(totalItems);
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

  static async getProduct(id) {
    try {
      const data = await db.selectByID('item', 'id_item', id);
      if(data){
        return [true, data]
      } else {
        return [false, 'ID không tồn tại'];
      }
    } catch (error) {
      throw error;
    }
  }

  static async updateProduct(data) {
    data.saleprice = data.price - data.price*data.discount/100;
    const rs = await db.update('item', new Item(data), 'id_item', data.id_item);
    if(rs) {
      return [true, 'Cập nhập thành công'];
    } else {
      return [false, 'Cập nhập thất bại, mời thử lại sau'];
    }
  }
}

module.exports = Item;

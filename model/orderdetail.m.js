const db = require("../db/db");

class OrderDetail {
    constructor(data) {
        this.id_order = data.id_order;
        this.id_item = data.id_item;
        this.quantity = data.quantity;
    }

    static async addOrderDetail(data) {
        try {
            const order = await db.insert('orderdetail', new OrderDetail(data));
        } catch (error) {
            throw error;
        }
    }
}

module.exports = OrderDetail;
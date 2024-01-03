const db = require("../db/db");
module.exports = class Orderuser {
    constructor(
        id_order,
        id_user,
        order_date,
        status,
        payment,
        id_cashier,
        total_price,
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
};

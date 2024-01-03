const db = require("../db/db");

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
    
    static async getOrdersList() {
        try {
            let orders = await db.selectAll("order");
            const listOrders = await Promise.all(orders.map(async (order) => {
                const items = await db.selectByOneField("orderdetail", "id_order", order.id_order);
                order.items = await Promise.all(items.map( async(item) => {
                    const detail = await db.selectByID("item", "id_item", item.id_item);
                    return {
                        id_item: item.id_item,
                        name: detail.name,
                        price: detail.price,
                        discount: detail.discount,
                        saleprice: detail.saleprice,
                        quantity: item.quantity
                    }
                }))
                return order;
            }));            
            return listOrders;
        } catch (error) {
            throw error;
        }

    }
}

module.exports = Order;
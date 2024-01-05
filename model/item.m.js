const db = require("../db/db");

module.exports = {
  getItem: async (itemId) => {
    try {
      const data = await db.query(
        `SELECT * FROM "item" where "item"."id_item" = ${itemId}`
      );
      console.log(data);
      return data[0];
    } catch (error) {
      throw error;
    }
  },

  updateItemQuantity: async (item_id, quantity) => {
    try {
      const data = await db.query(
        `UPDATE item
        SET quantity = ${quantity} 
        WHERE id_item = ${item_id}
        returning *`
      );
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  },
};

const db = require("../db/db");

module.exports = {
  addFood: async (FoodId, Username) => {
    try {
      let user = await db.selectByOneField("user", "username", Username);
      let IdUser = user[0].id_user;
      await db.addFood(FoodId, IdUser);
      //insert success alert
      return {};
    } catch (error) {
      throw error;
    }
  },

  getAllItemInCart: async (username) => {
    try {
      const user = await db.selectByOneField("user", "username", username);
      const id_user = user[0].id_user;
      const data = await db.query(
        `SELECT * FROM "cart","item" where "cart"."id_user" = '${id_user}' and "cart"."id_item" = "item"."id_item"`
      );
      // console.log(data);
      return data;
    } catch (err) {
      throw err;
    }
  },

  deleteCartItem: async (username, cartId, itemID) => {
    try {
      const user = await db.selectByOneField("user", "username", username);
      const id_user = user[0].id_user;
      await db.query(
        `DELETE FROM "cart" WHERE "id_cart" = '${cartId}' and "id_user" = '${id_user}' and "id_item" = '${itemID}'`
      );
    } catch (err) {
      throw err;
    }
  },
};

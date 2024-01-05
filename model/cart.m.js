const db = require("../db/db");

module.exports = {
  addFood: async (FoodId, Username) => {
    try {
      let user = await db.selectByOneField("user", "username", Username);
      let IdUser = user[0].id_user;
      //check exist that food in cart just need update quantity
      let food = await db.selectByOneField("cart", "id_user", IdUser);
      for (const item of food) {
        if (item.id_item == FoodId) {
          //update quantity
          const flag = db.updateCart(item.quantity + 1, IdUser);
          if (flag) {
            return true;
          }
          return false;
        }
      }

      const data = await db.addFood(FoodId, IdUser);
      //insert success alert
      if (data) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  },

  getAllItemInCart: async (username) => {
    try {
      const user = await db.selectByOneField("user", "username", username);
      const id_user = user[0].id_user;
      const data = await db.query(
        `SELECT i."image", i."name", i."type", i."saleprice", i."id_item", c."id_cart", c."quantity" FROM "cart" c,"item" i where c."id_user" = '${id_user}' and c."id_item" = i."id_item"`
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

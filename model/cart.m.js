const db = require("../db/db");

exports.getAllItemInCart = async (username) => {
  try {
    const user = await db.selectByOneField("user", "username", username);
    const id_user = user[0].id_user;
    const data = await db.query(
      `SELECT * FROM "cart","item" where "cart"."id_user" = '${id_user}' and "cart"."id_item" = "item"."id_item"`
    );
    return data;
  } catch (err) {
    throw err;
  }
};

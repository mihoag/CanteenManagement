const { pgp, db } = require("../configs/DBconnection");

module.exports = {
  selectAll: async (tbName) => {
    let dbcn = null;
    try {
      dbcn = await db.connect();
      //let data = [];
      data = await dbcn.any(`SELECT * FROM "${tbName}"`);
      return data;
    } catch (error) {
      throw error;
    } finally {
      dbcn.done();
    }
  },
  selectByID: async (tbName, fieldname, value) => {
    let dbcn = null;
    try {
      dbcn = await db.connect();
      data = await dbcn.oneOrNone(
        `SELECT * FROM "${tbName}" where "${fieldname}" = $1`,
        [value]
      );
      //  console.log(data)
      return data;
    } catch (error) {
      throw error;
    } finally {
      dbcn.done();
    }
  },

  selectByOneField: async (tbName, fieldname, value) => {
    let dbcn = null;
    try {
      dbcn = await db.connect();
      data = await dbcn.any(
        `SELECT * FROM "${tbName}" where "${fieldname}" = $1`,
        [value]
      );
      //  console.log(data)
      return data;
    } catch (error) {
      throw error;
    } finally {
      dbcn.done();
    }
  },
  insert: async (tbName, entity) => {
    try {
      const query = pgp.helpers.insert(entity, null, tbName);
      console.log(query);
      const data = await db.one(query + ` returning *`);
      return data;
    } catch (error) {
      throw error;
    }
  },
  delete: async (tbName, fieldname, value) => {
    try {
      const rs = await db.none(
        `delete from "${tbName}" where "${fieldname}" = $1`,
        [value]
      );
      return rs;
    } catch (error) {
      throw error;
    }
  },
  update: async (tbName, entity, fieldName, value) => {
    try {
      const query =
        pgp.helpers.update(entity, null, tbName) +
        ` where "${fieldName}" = ${value}`;
      const rs = await db.none(query);
      return rs;
    } catch (error) {
      throw error;
    }
  },
  selectMax: async (tbName, fieldName) => {
    let dbcn = null;
    try {
      dbcn = await db.connect();
      data = await dbcn.oneOrNone(
        `SELECT max("${fieldName}") FROM "${tbName}" `
      );
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    } finally {
      dbcn.done();
    }
  },
  getFoodRecent: async (userName,nameFood) => {
    let dbcn = null;
    try {
      dbcn = await db.connect();
      //let data = [];
      //id user
      data = await dbcn.any(`SELECT * 
      FROM item 
      WHERE id_item IN (
      SELECT i.id_item
      FROM item i, "order" o, "user" u, orderdetail dt
      WHERE u.username = '${userName}' AND u.id_user = o.id_user AND o.id_order = dt.id_order AND dt.id_item = i.id_item
      AND i.name ILIKE '%${nameFood}%'
      ORDER BY o.order_date
      )
      LIMIT 20`);

      return data;
    } catch (error) {
      throw error;
    } finally {
      dbcn.done();
    }
  },
  getFoodPromotion: async (nameFood) => {
    let dbcn = null;
    try {
      dbcn = await db.connect();
      //let data = [];
      data = await dbcn.any(`SELECT * FROM "item" i WHERE i.name ILIKE '%${nameFood}%'   order by i.id_item LIMIT 20`);

      return data;
    } catch (error) {
      throw error;
    } finally {
      dbcn.done();
    }
  },
  getFoodNew: async (nameFood) => {
    let dbcn = null;
    try {
      dbcn = await db.connect();
      //let data = [];
      data = await dbcn.any(`SELECT * FROM "item" i WHERE  i.name ILIKE '%${nameFood}%'  order by i.id_item desc
      LIMIT 20`);
      return data;
    } catch (error) {
      throw error;
    } finally {
      dbcn.done();
    }
  },
  getFoodSold: async (nameFood) => {
    let dbcn = null;
    try {
      dbcn = await db.connect();
      //let data = [];
      data = await dbcn.any(`
      SELECT i.id_item,i.name,i.price,i.image FROM "item" i, "order" o, "orderdetail" dt 
      WHERE o.id_order = dt.id_order AND dt.id_item = i.id_item AND  i.name ILIKE '%${nameFood}%'
      GROUP BY i.id_item,i.name,i.price,i.image
      order BY SUM(dt.quantity) DESC 
      LIMIT 20`);

      return data;
    } catch (error) {
      throw error;
    } finally {
      dbcn.done();
    }
  },
  getFoodFavorite: async (nameFood) => {
    let dbcn = null;
    try {
      dbcn = await db.connect();
      //let data = [];
      data = await dbcn.any(`SELECT i.id_item,i.name,i.price,i.image
      FROM "item" i, "order" o, orderdetail dt
      WHERE o.id_order = dt.id_order AND dt.id_item = i.id_item AND i.name ILIKE '%${nameFood}%'
      GROUP BY i.id_item,i.name,i.price,i.image
      order BY COUNT(dt.id_item) DESC
      LIMIT 20`);

      return data;
    } catch (error) {
      throw error;
    } finally {
      dbcn.done();
    }
  },
  getFoodAll: async (tbName,nameFood) => {
    let dbcn = null;
    try {
      dbcn = await db.connect();
      //let data = [];
      data = await dbcn.any(`SELECT * FROM "${tbName}" i WHERE
      i.name ILIKE '%${nameFood}%'`);

      return data;
    } catch (error) {
      throw error;
    } finally {
      dbcn.done();
    }
  },
};

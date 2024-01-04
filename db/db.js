const { pgp, db } = require("../configs/DBconnection");

module.exports = {
  query: async (query) => {
    let dbcn = null;
    try {
      dbcn = await db.connect();
      //let data = [];
      data = await dbcn.any(query);
      return data;
    } catch (error) {
      throw error;
    } finally {
      dbcn.done();
    }
  },
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
      const data = await dbcn.oneOrNone(
        `SELECT * FROM "${tbName}" where "${fieldname}" = $1`,
        [value]
      );
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
      return data;
    } catch (error) {
      throw error;
    } finally {
      dbcn.done();
    }
  },
  getFoodRecent: async (userName, nameFood) => {
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
      LIMIT 40`);

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
      data = await dbcn.any(
        `SELECT * FROM "item" i WHERE i.name ILIKE '%${nameFood}%'   order by i.id_item LIMIT 40`
      );

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
      data =
        await dbcn.any(`SELECT * FROM "item" i WHERE  i.name ILIKE '%${nameFood}%'  order by i.id_item desc
      LIMIT 40`);
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
      LIMIT 40`);

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
      WHERE o.id_order = dt.id_order AND dt.id_item = i.id_item AND i.name ILIKE N'%${nameFood}%'
      GROUP BY i.id_item,i.name,i.price,i.image
      order BY COUNT(dt.id_item) DESC
      LIMIT 40`);

      return data;
    } catch (error) {
      throw error;
    } finally {
      dbcn.done();
    }
  },
  getFoodAll: async (tbName, nameFood) => {
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

  selectAllByPage: async (tbName, pageSize, pageNumber) => {
    let dbcn = null;
    try {
      dbcn = await db.connect();
      const offset = (pageNumber - 1) * pageSize;
      data = await dbcn.any(`SELECT * FROM "${tbName}" LIMIT ${pageSize} OFFSET ${offset}`);
      return data;
    } catch (error) {
      throw error;
    } finally {
      dbcn.done();
    }
  },
  addFood: async (idFood, IdUser) => {
    try {
      await db.one(`INSERT INTO "cart"(id_user,id_item,quantity) VALUES(${IdUser},${idFood},1) returning *`);
    } catch (error) {
      throw error;
    }
  },
};

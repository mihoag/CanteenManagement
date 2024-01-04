const { pgp, db } = require("../configs/DBconnection");

module.exports = {
  getNumberProductInStock: async function () {
    let dbcn = null;
    try {
      dbcn = await db.connect();
      //let data = [];
      data = await dbcn.one('select count(*) as numpro from item');
      return data;
    } catch (error) {
      throw error;
    } finally {
      dbcn.done();
    }
  },
  getTodayRevenue: async function () {
    try {
      dbcn = await db.connect();
      data = await dbcn.one(
        `
        select SUM(i.saleprice * d.quantity) from "orderdetail" d, "item" i, "order" o where d."id_item" = i."id_item" and o."id_order" = d."id_order" and CURRENT_DATE=o."order_date"
        `
      );
      return data;
    } catch (error) {
      throw error;
    } finally {
      dbcn.done();
    }
  },
  getMonthRevenue: async function () {
    try {
      dbcn = await db.connect();
      data = await dbcn.one(
        `
        select SUM(i.saleprice * d.quantity) from "orderdetail" d, "item" i, "order" o where d."id_item" = i."id_item" and o."id_order" = d."id_order" and date_part('month', o."order_date") = date_part('month',CURRENT_DATE) and date_part('year', o."order_date") = date_part('year',CURRENT_DATE)
        `
      );
      return data;
    } catch (error) {
      throw error;
    } finally {
      dbcn.done();
    }
  },
  getRevenue: async function () {
    try {
      dbcn = await db.connect();
      data = await dbcn.any(
        `
        select SUM((i.saleprice - i.cost) * d.quantity) as profit, SUM(i.saleprice * d.quantity) as sum, extract('day' from o."order_date") as day from "orderdetail" d, "item" i, "order" o where d."id_item" = i."id_item" and o."id_order" = d."id_order" and date_part('year', o."order_date") = date_part('year', CURRENT_DATE) and date_part('month', o."order_date") = date_part('month', CURRENT_DATE) group by extract('day' from o."order_date")
        `
      );
      return data;
    } catch (error) {
      throw error;
    } finally {
      dbcn.done();
    }
  },
  getRevenueWeek: async function (from, to) {
    try {
      dbcn = await db.connect();
      data = await dbcn.any(
        `
        select SUM((i.saleprice - i.cost) * d.quantity) as profit, SUM(i.saleprice * d.quantity) as sum, extract('day' from o."order_date") as day from "orderdetail" d, "item" i, "order" o where d."id_item" = i."id_item" and o."id_order" = d."id_order" and o."order_date">='${from}' and o."order_date"<= '${to}' group by extract('day' from o."order_date")
        `
      );
      return data;
    } catch (error) {
      throw error;
    } finally {
      dbcn.done();
    }
  },
  getStas4Table: async function () {
    try {
      dbcn = await db.connect();
      data = await dbcn.any(
        `
        select * from "item" where "type"=N'Đồ uống' order by id_item
        `
      );
      return data;
    } catch (error) {
      throw error;
    } finally {
      dbcn.done();
    }
  },
  getStas2Table: async function () {
    try {
      dbcn = await db.connect();
      data = await dbcn.any(
        `
        select i.name, i.id_item, i.image, i.saleprice, sum(d.quantity) as quantity, i.type from "item" i, "orderdetail" d where i."id_item" = d."id_item"  group by i.name, i.id_item, i.image, i.saleprice, i.type order by id_item 
        `
      );
      return data;
    } catch (error) {
      throw error;
    } finally {
      dbcn.done();
    }
  }
}
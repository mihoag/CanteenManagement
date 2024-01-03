const { json } = require("express");
const { pgp, db } = require("../configs/DBconnection");
module.exports = class customerModel {
    static async getAll() {
        try {
            let data = await db.any(`select u.*, sum(o."total_price") as tongchi from "user" u left join "order" o on u."id_user" = o."id_user" where u."role" = 'user' group by u."id_user"`);
            return data;
        } catch (error) {
            throw error;
        }
    }
    static async searchByName(name) {
        try {
            let data = await db.any(`select u.*, sum(o."total_price") as tongchi from "user" u left join "order" o on u."id_user" = o."id_user" where u."role" = 'user' and u."name" like '%${name}%' group by u."id_user"`);
            return data;
            //return json.status(200).json({ data: data });
        } catch (error) {
            throw error;
        }
    }
};

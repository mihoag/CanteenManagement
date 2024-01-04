//const userM = require("../../model/user.m");
const { db } = require("../../configs/DBconnection");
class userController {
    async updateSodu(req, res, next) {
        try {
            const { username, sotien } = req.body;
            //let u = await userM.selectByUsername(username);
            //let user = new userM(u.id_user, u.username, u.password, u.name, u.email, u.password_changed_at, u.public_id, u.url_image, u.role, u.active );
            await db.none(`UPDATE "user" set "money" = "money" + ${parseInt(sotien)} where username = '${username}'`);
            res.status(200).json({ msg: "Nạp tiền thành công" });
        } catch (error) {
            console.log(error)
            res.status(400).json({ msg: "Nạp tiền thất bại" });
        }
    }
}

module.exports = new userController;

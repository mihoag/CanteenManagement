class orderController {
    async showOrder(req, res, next) {
        try {
            res.render("user/order", { layout: "userLayout" });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new orderController;
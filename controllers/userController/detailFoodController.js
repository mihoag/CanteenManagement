const menuModel = require("../../model/menu.m")
const hbsHelper = require('../../helper/hbs_helper');
class detailFoodController {
    async detailFood(req, res, next) {
        try {
            const {FoodId} = req.params;
            
            const data = await menuModel.getDetailFood(FoodId);

            res.render("user/detailFood", { layout: "userLayout", css: "style", food: data });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new detailFoodController;
class detailFoodController {
    async detailFood(req, res, next) {
        
        try {
            res.render("user/detailFood", { layout: "userLayout" });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new detailFoodController;
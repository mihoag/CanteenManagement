class menuController {
    async menuFoods(req, res, next) {
        try {
            const index = 0;
            res.render("user/menu", { layout: "userLayout",index });
        } catch (error) {
            next(error);
        }
    }
    async newFoods(req, res, next) {
        try {
            const index = 1;
            res.render("user/menu", { layout: "userLayout",index });
        } catch (error) {
            next(error);
        }
    }
    async promotionFoods(req, res, next) {
        try {
            const index = 2;
            res.render("user/menu", { layout: "userLayout",index });
        } catch (error) {
            next(error);
        }
    }
    async saleFoods(req, res, next) {
        try {
            const index = 3;
            res.render("user/menu", { layout: "userLayout",index });
        } catch (error) {
            next(error);
        }
    }
    async favoriteFoods(req, res, next) {
        try {
            const index = 4;
            res.render("user/menu", { layout: "userLayout",index });
        } catch (error) {
            next(error);
        }
    }
    async allFoods(req, res, next) {
        try {
            const index = 5;
            res.render("user/menu", { layout: "userLayout",index });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new menuController;
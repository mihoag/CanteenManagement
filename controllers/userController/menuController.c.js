const menuModel = require("../../model/menu.m")
const hbsHelper = require('../../helper/hbs_helper');
class menuController {
    async menuFoods(req, res, next) {
        try {
           
            const username = req.session.username;
            let foodSearch="";
            if(req.query.nameFood)
            {
                foodSearch = req.query.nameFood
            }
            const index = 5;
            const data = await menuModel.getFoodRecent(username,foodSearch);
            const { perPage = 8, currentPage = 1 } = req.query;
            const totalPage = Math.ceil(data.length / perPage);
            const foods = data.splice((currentPage-1)*perPage,perPage);
            res.render("user/menu", { layout: "userLayout", index, food: foods, totalPage, currentPage,
            helpers: hbsHelper, direct: "recent"
         });
        } catch (error) {
            next(error);
        }
    }
    async newFoods(req, res, next) {
        try {
            let foodSearch="";
            if(req.query.nameFood)
            {
                foodSearch = req.query.nameFood
            }
            const index = 2;
            const data = await menuModel.getFoodNew(foodSearch);
            const { perPage = 8, currentPage = 1 } = req.query;
            const totalPage = Math.ceil(data.length / perPage);
            const foods = data.splice((currentPage-1)*perPage,perPage);
            res.render("user/menu", { layout: "userLayout", index,  food: foods, totalPage, currentPage,
            helpers: hbsHelper, direct: "new" });
        } catch (error) {
            next(error);
        }
    }
    async promotionFoods(req, res, next) {
        try {
            let foodSearch="";
            if(req.query.nameFood)
            {
                foodSearch = req.query.nameFood
            }
            const index = 1;
            const data = await menuModel.getFoodPromotion(foodSearch);
            const { perPage = 8, currentPage = 1 } = req.query;
            const totalPage = Math.ceil(data.length / perPage);
            const foods = data.splice((currentPage-1)*perPage,perPage);
            res.render("user/menu", { layout: "userLayout", index,food: foods, totalPage, currentPage,
            helpers: hbsHelper, direct: "promotion" });
        } catch (error) {
            next(error);
        }
    }
    async saleFoods(req, res, next) {
        try {
            let foodSearch="";
            if(req.query.nameFood)
            {
                foodSearch = req.query.nameFood
            }
            const index = 3;
            const data = await menuModel.getFoodSoldOut(foodSearch);
            const { perPage = 8, currentPage = 1 } = req.query;
            const totalPage = Math.ceil(data.length / perPage);
            const foods = data.splice((currentPage-1)*perPage,perPage);
            res.render("user/menu", { layout: "userLayout", index,food: foods, totalPage, currentPage,
            helpers: hbsHelper, direct: "bestsell" });
        } catch (error) {
            next(error);
        }
    }
    async favoriteFoods(req, res, next) {
        try {
            let foodSearch="";
            if(req.query.nameFood)
            {
                foodSearch = req.query.nameFood
            }
            const index = 4;
            const data = await menuModel.getFoodFavorite(foodSearch);
            const { perPage = 8, currentPage = 1 } = req.query;
            const totalPage = Math.ceil(data.length / perPage);
            const foods = data.splice((currentPage-1)*perPage,perPage);
            res.render("user/menu", { layout: "userLayout", index,food: foods, totalPage, currentPage,
            helpers: hbsHelper, direct: "favorite" });
        } catch (error) {
            next(error);
        }
    }
    async allFoods(req, res, next) {
        try {
            let foodSearch="";
            if(req.query.nameFood)
            {
                foodSearch = req.query.nameFood
            }
            const index = 0;
            const data = await menuModel.getFoodAll(foodSearch);
            const { perPage = 8, currentPage = 1 } = req.query;
            const totalPage = Math.ceil(data.length / perPage);
            const foods = data.splice((currentPage-1)*perPage,perPage);
            res.render("user/menu", { layout: "userLayout", index,food: foods, totalPage, currentPage,
            helpers: hbsHelper, all: false});
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new menuController;
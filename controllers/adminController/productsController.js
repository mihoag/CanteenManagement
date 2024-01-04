const Product = require('../../model/product.m');

class productsController {
    async showProducts(req, res, next) {
        try {
            const pageNum = req.query.page||1;
            const search = req.query.search;
            const data = await Product.getProductsList(pageNum, search);
            res.render("admin/products", {
                layout: "adminLayout",
                title: "Products",
                isProducts: true,
                css: 'products',
                js: 'products',
                data: data
              });
        } catch (error) {
            next(error);
        }
    }

    async page(req, res, next) {
        try {
            const pageNum = req.query.page;
            const search = req.query.search;
            const data = await Product.getProductsList(pageNum, search);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new productsController();
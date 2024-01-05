const Product = require('../../model/product.m');
const my_cloudinary = require("../../configs/myCloundinary");

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

    async addProduct(req, res, next) {
        try {
            if (!req.file) {
                return res.status(406).json('Vui lòng chọn ảnh minh họa');
            }
            const { url, public_id } = await my_cloudinary.push(req.file.path);
            const item = req.body;
            item.image = url;
            item.public_id = public_id;
            const result = await Product.addProduct(item);
            if(result[0]) {
                res.status(200).json(result[1]);
            } else {
                res.status(406).json(result[1]);
            }
        } catch (error) {
            next(error);
        }
    }
    
    async getProduct(req, res, next) {
        try {
            const result = await Product.getProduct(req.query.id_item);
            if(result[0]) {
                res.status(200).json(result[1]);
            } else {
                res.status(406).json(result[1]);
            }
        } catch (error) {
            next(error);
        }
    }
    
    async updateProduct(req, res, next) {
        try {
            const item = req.body;
            if(req.file) {
                const { url, public_id } = await my_cloudinary.push(req.file.path);
                item.image = url;
                item.public_id = public_id;
            } else {
                item.image = item.oldimage;
            }
            const result = await Product.updateProduct(item);
            if(result[0]) {
                res.status(200).json(result[1]);
            } else {
                res.status(406).json(result[1]);
            }
            
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new productsController();
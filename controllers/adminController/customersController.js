const customermodel = require('../../model/customer.m')
class customersController {
    async showCustomers(req, res, next) {
        try {
            let listCus = await customermodel.getAll();
            res.render("admin/customers", {
                layout: "adminLayout",
                title: "Customers",
                isCustomers: true,
                css: "customers",
                js: "customers",
                listCus: listCus
            });
        } catch (error) {
            next(error);
        }
    }

    async seachCus(req, res, next) {
        try {
            let keyword = req.body.keyword;
            let data = await customermodel.searchByName(keyword);
            let result = [];
            const per_page = 10;
            let totalPage = parseInt(parseInt(data.length) / parseInt(per_page));
            if (data.length % per_page != 0) {
                totalPage++;
            }

            let currentPage = req.body.currentPage;
            if (currentPage === undefined) {
                currentPage = 1;
            }

            let start = (currentPage - 1) * per_page;
            for (let i = start; i < start + per_page; i++) {
                if (i >= data.length) {
                    break;
                }
                result.push(data[i]);
            }
            /// Tao mot mang tu 1,2..., totalPae
            // res.json({ listproduct: result, totalPage: totalPage, currentPage: currentPage });


            res.status(200).json({ data: result, totalPage: totalPage, currentPage: currentPage });
        } catch (error) {
            next(error)
        }
    }
}
module.exports = new customersController();
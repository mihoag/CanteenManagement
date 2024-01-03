const customermodel = require('../../model/customer.m')
class customersController {
    async showCustomers(req, res, next) {
        try {
            let listCus = await customermodel.getAll();
            console.log(listCus)
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
            console.log(data);
            res.status(200).json({ data: data });
        } catch (error) {
            next(error)
        }
    }
}
module.exports = new customersController();
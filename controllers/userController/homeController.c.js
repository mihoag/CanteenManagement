class homeController {
    async showHome(req, res, next) {
        try {
            let name = req.session.name;
            console.log(name)
            res.render("user/home", { layout: "userLayout", name: name });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new homeController;
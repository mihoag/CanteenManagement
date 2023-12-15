class logoutController {
    async logout(req, res, next) {
        try {
            req.session.destroy();
            res.redirect('/');
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new logoutController
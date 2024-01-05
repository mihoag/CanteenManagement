const userModel = require('../../model/user.m')
class homeController {
  async showHome(req, res, next) {
    try {
      //let name = req.session.name;
      let user = await userModel.selectByUsername(req.session.username);
      //console.log(req.session)
      res.render("user/home", { layout: "userLayout", name: user.name, username: user.username, ishomeUser: true });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new homeController();
